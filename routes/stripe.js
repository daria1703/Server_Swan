const { default: Stripe } = require("stripe");
const Order = require("../models/Order");

const router = require("express").Router();
const KEY = process.env.STRIPE_KEY
const stripe = require("stripe")(KEY);



router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

router.get("/charges/:id", (req, res) => {
  const chargeId = req.params.id;
  stripe.charges.retrieve(chargeId, (err, charge) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(charge);
    }
  });
});

router.get("/charges", (req, res) => {
  const chargeId = req.params.id;
  stripe.charges.retrieve(chargeId, (err, charge) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(charge);
    }
  });
});

module.exports = router;

router.get("/income", async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});
