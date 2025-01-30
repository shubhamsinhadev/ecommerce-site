import { model, Schema } from "mongoose";

const addressSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNo: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Invalid phone number format"],
  },
  pincode: {
    type: String,
    required: true,
    match: [/^\d{6}$/, "Invalid pincode format"],
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  cityDistrictTown: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  landmark: {
    type: String,
    trim: true,
  },
  addressType: {
    type: String,
    enum: ["Home", "Office", "Other"],
    default: "Home",
  },
});

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity can not be less than 1"],
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      min: [1, "Price can not be less than 1"],
    },
    address: addressSchema,
    paymentIntentId: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "failed", "succeeded"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = model("Order", orderSchema);

export default Order;
