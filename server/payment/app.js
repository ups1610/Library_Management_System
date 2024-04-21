const express = require('express');
const cors = require('cors');
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(express.json());
app.use(cors());



app.post("/api/create-checkout-session", async (req, res) => {
    try {
        const product = req.body;

        if (!product || !product.amount || !product.member) {
            return res.status(400).json({ error: "Invalid request. Please provide product information." });
        }

        const price = await stripe.prices.create({
            currency: 'inr',
            unit_amount: product.amount * 100,
            product_data: {
                name: product.member
            }
        });

        const paymentLink = await stripe.paymentLinks.create({
            line_items: [{
                price: price.id,
                quantity: 1,
            }],
        });

        res.json({ url: paymentLink.url });
    } catch (error) {
        console.error("Error creating payment link:", error);
        res.status(500).json({ error: "Failed to create payment link" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
