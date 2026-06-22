import { getAllPaymentHistory } from "@/lib/actions/user";
import React from "react";

const TransactionPage = async () => {
  const transactions = await getAllPaymentHistory();

  return (
    <div className="p-6">
      <div className="bg-[#071E22] rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-2xl font-bold text-[#4EA618]">
            Transaction History
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Total Transactions: {transactions?.length || 0}
          </p>
        </div>

        <div className="overflow-x-auto p-6 bg-[#0F3D3E]">
          <table className="table w-full ">
            <thead className="bg-[#071E22]  text-gray-200">
              <tr className="p-3">
                <th className="text-left">#</th>
                <th className="text-left">User</th>
                <th className="text-left">Trainer</th>
                <th className="text-left">Class</th>
                <th className="text-left">Amount</th>
                <th className="text-left">Payment Date</th>
              </tr>
            </thead>

            <tbody className="space-y-2">
              {transactions.map((transaction, index) => (
                <tr
                  key={transaction._id}
                  className="text-gray-300 border-b border-gray-600"
                >
                  <td className="text-left">{index + 1}</td>
                  <td className="text-left">{transaction.userName}</td>
                  <td className="text-left">{transaction.trainerName}</td>
                  <td className="text-left">{transaction.className}</td>
                  <td className="text-left">${transaction.amount}</td>
                  <td className="text-left">
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
