import { stripe } from "../app.js";
import { TryCatch } from "../middlewares/error.js";
import { Coupon } from "../models/coupon.js";
import ErrorHandler from "../utils/utilityClass.js";

// stripe payment
export const createPaymentIntent = TryCatch(async (req, res, next) => {
  const { amount } = req.body;

  if (!amount) {
    return next(new ErrorHandler("Please enter the amount", 400));
  }
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Number(amount * 100),
    currency: "inr",
  });

  return res.status(201).json({
    success: true,
    clientSecret: paymentIntent.client_secret,
  });
});

export const newCoupon = TryCatch(async (req, res, next) => {
  const { code, amount } = req.body;

  if (!code || !amount)
    return next(new ErrorHandler("Please enter both coupon and amount", 400));

  const discount = await Coupon.findOne({ code });

  if (!discount) {
    const coupon = await Coupon.create({ code, amount });
    return res.status(201).json({
      success: true,
      message: `Coupon "${coupon.code}" Created Successfully`,
    });
  } else {
    return res.status(200).json({
      success: true,
      message: `Coupon already exists`,
    });
  }
});

export const applyDiscount = TryCatch(async (req, res, next) => {
  const { code } = req.query;

  const discount = await Coupon.findOne({ code });

  if (!discount) return next(new ErrorHandler("Invalid Coupon Code", 400));

  return res.status(200).json({
    success: true,
    discount: discount.amount,
  });
});

export const getAllCoupons = TryCatch(async (req, res, next) => {
  const coupons = await Coupon.find({});

  return res.status(200).json({
    success: true,
    coupons,
  });
});

export const deleteCoupon = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  const coupon = await Coupon.findByIdAndDelete(id);

  if (!coupon) {
    return next(new ErrorHandler("Invalid coupon Id", 400));
  }
  return res.status(200).json({
    success: true,
    message: "Coupon deleted successfully",
  });
});
