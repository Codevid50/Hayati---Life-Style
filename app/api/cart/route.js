import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Cart from "@/models/Cart";
import { MenProduct, WomenProduct } from "@/models/Product";
import { getServerSession } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import AuthUser from "@/models/AuthUser";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      await connectDB();
      const existing = await AuthUser.findOne({ email: user.email });
      if (!existing) {
        await AuthUser.create({
          name: user.name,
          email: user.email,
          image: user.image,
          provider: account.provider,
        });
      }
      return true;
    },
    async session({ session }) {
      await connectDB();
      const userData = await AuthUser.findOne({ email: session.user.email });
      session.user.id = userData._id;
      return session;
    },
  },
};

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // Fetch cart items without populate first
    const cart = await Cart.findOne({ userId: session.user.id });

    if (!cart) {
      return NextResponse.json({ items: [] }, { status: 200 });
    }

    // Manually populate the productId
    const populatedItems = await Promise.all(
      cart.items.map(async (item) => {
        const product = await MenProduct.findById(item.productId) || await WomenProduct.findById(item.productId);
        if (!product) {
          return null; // Skip if product not found
        }
        return {
          ...item.toObject(),
          productId: product,
        };
      })
    );

    // Filter out null items
    const validItems = populatedItems.filter(item => item !== null);

    return NextResponse.json({ items: validItems }, { status: 200 });
  } catch (error) {
    console.error("GET CART ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId, quantity = 1, size } = await request.json();

    if (!productId || !size) {
      return NextResponse.json({ error: "Product ID and size are required" }, { status: 400 });
    }

    await connectDB();

    let cart = await Cart.findOne({ userId: session.user.id });

    if (!cart) {
      cart = new Cart({ userId: session.user.id, items: [] });
    }

    // Check if item already exists
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId && item.size === size
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity, size });
    }

    await cart.save();

    return NextResponse.json({ message: "Item added to cart" }, { status: 201 });
  } catch (error) {
    console.error("POST CART ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId, size } = await request.json();

    if (!productId || !size) {
      return NextResponse.json({ error: "Product ID and size are required" }, { status: 400 });
    }

    await connectDB();

    const cart = await Cart.findOne({ userId: session.user.id });

    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    cart.items = cart.items.filter(
      (item) => !(item.productId.toString() === productId && item.size === size)
    );

    await cart.save();

    return NextResponse.json({ message: "Item removed from cart" }, { status: 200 });
  } catch (error) {
    console.error("DELETE CART ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
