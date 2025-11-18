import { MenProduct, WomenProduct } from "@/models/Product";
import { connectDB } from "@/lib/mongodb";

export async function GET(request) {
  try {
    await connectDB(); // ✅ ensures local MongoDB connection

    const category = request.nextUrl.searchParams.get("category");
    const search = request.nextUrl.searchParams.get("search");
    const page = parseInt(request.nextUrl.searchParams.get("page")) || 1;
    const limit = parseInt(request.nextUrl.searchParams.get("limit")) || 20;
    const skip = (page - 1) * limit;

    let query = {};
    let products = [];
    let totalProducts = 0;

    // Build query based on category
    if (category === "men") {
      query = {};
      totalProducts = await MenProduct.countDocuments(query);
      products = await MenProduct.find(query).skip(skip).limit(limit).sort({ createdAt: -1 });
    } else if (category === "women") {
      query = {};
      totalProducts = await WomenProduct.countDocuments(query);
      products = await WomenProduct.find(query).skip(skip).limit(limit).sort({ createdAt: -1 });
    } else {
      // For search or general listing, combine both collections
      const menProducts = await MenProduct.find(query).sort({ createdAt: -1 });
      const womenProducts = await WomenProduct.find(query).sort({ createdAt: -1 });
      products = [...menProducts, ...womenProducts];
      totalProducts = products.length;

      // Apply pagination after combining
      products = products.slice(skip, skip + limit);
    }

    // Filter by search term if provided
    if (search) {
      const searchRegex = new RegExp(search, 'i'); // Case-insensitive search
      products = products.filter(product =>
        searchRegex.test(product.title) || searchRegex.test(product.desc)
      );
      totalProducts = products.length; // Update total for search results
    }

    const totalPages = Math.ceil(totalProducts / limit);

    return Response.json({
      success: true,
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    }, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return Response.json(
      { success: false, message: "Error fetching products" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB(); // ✅ connect before writing

    const body = await request.json();

    const required = [
      "title",
      "image",
      "price",
      "rating",
      "desc",
      "briefDesc",
      "category",
      "type",
      "sizes",
    ];

    for (const field of required) {
      if (!body[field]) {
        return Response.json(
          { success: false, message: `Missing field: ${field}` },
          { status: 400 }
        );
      }
    }

    const productData = {
      title: body.title,
      image: body.image,
      price: body.price,
      oldPrice: body.oldPrice || null,
      discount: body.discount || null,
      rating: body.rating,
      desc: body.desc,
      briefDesc: body.briefDesc,
      category: body.category,
      type: body.type,
      sizes: body.sizes,
      createdAt: new Date(),
    };

    if (body.category === "men") {
      await MenProduct.create(productData);
    } else if (body.category === "women") {
      await WomenProduct.create(productData);
    } else {
      return Response.json(
        { success: false, message: "Invalid category" },
        { status: 400 }
      );
    }

    return Response.json(
      { success: true, message: "Product added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error adding product:", error);
    return Response.json(
      { success: false, message: "Error adding product" },
      { status: 500 }
    );
  }
}
