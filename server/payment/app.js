const express = require('express');
const cors = require('cors');
const app = express();
const stripe = require("stripe")("sk_test_51P7CTlSCKWbIqmQ9AoXp7JVPXHsd0MPuHd6i3D9f39OmHlaluV0HcwCt3HatzEUHVYvXNFmqyt6drrrxHAYTkwZO00OI6thl1H");

app.use(express.json());
app.use(cors());

app.post("/api/create-checkout-session", async (req, res) => {
    const { products } = req.body;

    const lineItems = [{
        price_data: {
            currency: "inr",
            product_data: {
                name: products.member
            },
            unit_amount: products.amount * 100,
        },
        quantity: 1
    }];

    try {
        const paymentLink = await stripe.paymentLinks.create({
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:3000/dashboard/transactions",
            cancel_url: "http://localhost:3000/dashboard/transactions",
        });

        res.json({ url: paymentLink.url });
    } catch (error) {
        console.error("Error creating payment link:", error);
        res.status(500).json({ error: "Failed to create payment link" });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
