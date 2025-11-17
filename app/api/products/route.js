import { MenProduct, WomenProduct } from "@/models/Product";
import { connectDB } from "@/lib/mongodb";

export async function GET(request) {
  try {
    await connectDB(); // ✅ ensures local MongoDB connection

    const category = request.nextUrl.searchParams.get("category");
    const search = request.nextUrl.searchParams.get("search");
    let products = [];

    if (category === "men") {
      products = await MenProduct.find({});
    } else if (category === "women") {
      products = await WomenProduct.find({});
    } else {
      const men = await MenProduct.find({});
      const women = await WomenProduct.find({});
      products = [...men, ...women];
    }

    // Filter by search term if provided
    if (search) {
      const searchRegex = new RegExp(search, 'i'); // Case-insensitive search
      products = products.filter(product =>
        searchRegex.test(product.title) || searchRegex.test(product.desc)
      );
    }

    return Response.json({ success: true, products }, { status: 200 });
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
