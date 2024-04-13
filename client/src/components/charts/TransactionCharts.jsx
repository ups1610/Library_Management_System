import React, { useEffect, useState } from "react";
import { ResponsiveContainer, LineChart, XAxis, YAxis, Line, Tooltip, CartesianGrid } from "recharts";
import { useAuth } from "../../context/Authetication";
import { getAllTransaction } from "../../action/TransactionAction";


const TransactionChart = () => {
    const { token } = useAuth();
    const [transactionData, setTransactionData] = useState([]);

    useEffect(() => {
        const fetchTransactionData = async () => {
            try {
                const response = await getAllTransaction(token);
                if (response.success) {
                    const currentDate = new Date();
                    const lastSevenDays = new Date(currentDate);
                    lastSevenDays.setDate(currentDate.getDate() - 6);

                    
                    const transactionAmountByDate = {};
                    for (let i = 0; i < 7; i++) {
                        const date = new Date(lastSevenDays);
                        date.setDate(lastSevenDays.getDate() + i);
                        transactionAmountByDate[date.toISOString().split("T")[0]] = 0;
                    }

                   
                    response.data.forEach(transaction => {
                        const dateOfTransaction = transaction.date;
                        if (dateOfTransaction) {
                            const date = dateOfTransaction.split("T")[0];
                            if (date in transactionAmountByDate) {
                                transactionAmountByDate[date] += transaction.amount;
                            }
                        }
                    });

                   
                    const chartData = [];
                    Object.keys(transactionAmountByDate).forEach(date => {
                        chartData.push({
                            dateOfTransaction: date,
                            transactionAmount: transactionAmountByDate[date]
                        });
                    });

                    setTransactionData(chartData);
                } else {
                    console.error('Error fetching transactions:', response.data);
                }
            } catch (error) {
                console.error('Something went wrong: ', error);
            }
        };

        fetchTransactionData();
    }, [token]);

    return (
        <div>
           <div className="text-xs bg-white p-6 rounded-md mb-2 mt-4">
                <h2 className="text-lg">Collection in last 7 days</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={transactionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="dateOfTransaction" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="transactionAmount" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TransactionChart;
