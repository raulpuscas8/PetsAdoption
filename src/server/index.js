import express from "express";

const app = express();
const port = 3000;
const PUBLISHABLE_KEY =
  "pk_test_51N1w2fEN9Rbh6iDj8lkt3x0pKNEYuSrTDOutuUAOGMnzMBoMQQQotS4rEf7IOjB0u9B1HquPTIAVMhJpar2CWtiL00na8yA1Pj";
const SECRET_KEY =
  "sk_test_51N1w2fEN9Rbh6iDjnGfAPBVGtBTr2iHG7u4ZYhE6N1ZAn6PbFrbK2LB8RKMRWI9ALBMYm7qxxkGu1wDZb6mjYYf800MkrTmVd3";
import Stripe from "stripe";
const stripe = Stripe(SECRET_KEY, { apiVersion: "2022-11-15" });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: "usd",
      payment_method_types: ["card"],
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});
