import React, { useState, useMemo } from "react";
import { Header } from "../components/index";
import Dropdown from "../components/DropDown";
import { FaPlus } from "react-icons/fa";

const Transaction = () => {
  const transactionApi = [
    {
      id: "1",
      name: "Johnathan Catherine Doe",
      amount: "10,000",
      date: "September 6, 2024",
      type: "Given",
    },
  ];

  const [selectedAmount, setSelectedAmount] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [transactions, setTransactions] = useState(transactionApi);
  const [isAdding, setIsAdding] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    id: transactions.length + 1,
    name: "",
    amount: "",
    type: "",
    date: new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  });

  const [editingId, setEditingId] = useState(null);
  const [editedTransaction, setEditedTransaction] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [ledgerTitle, setLedgerTitle] = useState("Personal Budget");
  const [ledgerDescription, setLedgerDescription] = useState(
    "A comprehensive ledger designed to help you track and manage your personal finances. This includes recording your income, categorizing your expenses, and setting monthly or yearly budgets. By maintaining this ledger, you can gain insights into your spending habits, make informed decisions about saving and investing, and achieve better control over your financial health."
  );
  const [newTitle, setNewTitle] = useState(ledgerTitle);
  const [newDescription, setNewDescription] = useState(ledgerDescription);

  const handleLegerEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setLedgerTitle(newTitle);
    setLedgerDescription(newDescription);
    setIsEditing(false);
  };

  const handleLegerDelete = () => {
    // Here you would define the behavior for deleting the ledger
    // For example, you might clear the title and description or navigate away
    setLedgerTitle("");
    setLedgerDescription("");
  };

  const handleAddNewRow = () => {
    setIsAdding(true);
    setNewTransaction({
      ...newTransaction,
      id: transactions.length + 1,
    });
  };

  const handleInputChange = (e) => {
    setNewTransaction({
      ...newTransaction,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveTransaction = () => {
    if (newTransaction.name && newTransaction.amount && newTransaction.type) {
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        newTransaction,
      ]);
      setIsAdding(false); // Hide input fields after saving
      setNewTransaction({
        id: transactions.length + 1,
        name: "",
        amount: "",
        type: "",
        date: new Date().toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      }); // Reset input fields
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setNewTransaction({
      id: transactions.length + 1,
      name: "",
      amount: "",
      type: "",
      date: new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    });
    setEditingId(null);
    setEditedTransaction(null);
  };

  const handleEdit = (id) => {
    setEditingId(id);
    const transactionToEdit = transactions.find((t) => t.id === id);
    setEditedTransaction({ ...transactionToEdit });
  };

  const handleSaveEdit = () => {
    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction.id === editingId ? editedTransaction : transaction
      )
    );
    setEditingId(null);
    setEditedTransaction(null);
  };

  const handleDelete = (id) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((transaction) => transaction.id !== id)
    );
  };

  const handleInputChangeEdit = (e) => {
    setEditedTransaction({
      ...editedTransaction,
      [e.target.name]: e.target.value,
    });
  };

  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions]; // Use transactions instead of transactionApi

    if (selectedType) {
      filtered = filtered.filter(
        (transaction) => transaction.type === selectedType
      );
    }

    if (selectedAmount) {
      filtered = filtered.sort((a, b) => {
        const amountA = Number(a.amount.replace(/,/g, ""));
        const amountB = Number(b.amount.replace(/,/g, ""));

        if (selectedAmount === "H to L") {
          return amountB - amountA;
        } else if (selectedAmount === "L to H") {
          return amountA - amountB;
        }
        return 0;
      });
    }

    return filtered;
  }, [selectedAmount, selectedType, transactions]); // Dependencies updated

  return (
    <div>
      <Header />
      <div className="w-full px-36 pt-10">
        {isEditing ? (
          <>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="font-nunito text-2xl font-bold text-gray-800"
            />
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="font-nunito text-xl text-gray-800 mt-5 w-full"
            />
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <span className="font-nunito text-2xl font-bold text-gray-800">
              {ledgerTitle}
            </span>
            <p className="font-nunito text-xl text-gray-800 mt-5">
              {ledgerDescription}
            </p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleLegerEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={handleLegerDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
      <div className="flex px-36 my-12 justify-between">
        <span className="font-nunito text-4xl font-bold text-gray-800">
          Transactions
        </span>

        <div className="flex flex-row gap-5">
          <Dropdown
            title={"Amount"}
            options={["H to L", "L to H"]}
            selectedValue={selectedAmount}
            setSelectedValue={setSelectedAmount}
          />

          <Dropdown
            title={"Type"}
            options={["Given", "Taken"]}
            selectedValue={selectedType}
            setSelectedValue={setSelectedType}
          />
        </div>
      </div>
      <div className="px-60 my-10">
        <div className="flex items-center justify-between w-full border border-black p-5 rounded-t-xl">
          <div className="flex justify-center items-center h-auto w-5p">
            <span className="font-nunito text-xl font-bold text-gray-800">
              ID
            </span>
          </div>
          <div className="flex justify-center items-center h-auto w-50p">
            <span className="font-nunito text-xl font-bold text-gray-800">
              Full Name
            </span>
          </div>
          <div className="flex justify-center items-center h-auto w-15p">
            <span className="font-nunito text-xl font-bold text-gray-800">
              Amount
            </span>
          </div>
          <div className="flex justify-center items-center h-auto w-15p">
            <span className="font-nunito text-xl font-bold text-gray-800">
              Date
            </span>
          </div>
          <div className="flex justify-center items-center h-auto w-15p">
            <span className="font-nunito text-xl font-bold text-gray-800 pr-5">
              Type
            </span>
          </div>
        </div>
        {filteredTransactions.map((data, index) => (
          <div
            key={index}
            className="relative flex items-center justify-between w-full border border-black p-5 border-t-0 group hover:bg-gray-100"
          >
            <div className="flex justify-center items-center h-auto w-5p">
              <span className="font-nunito text-lg text-gray-800">
                {data.id}
              </span>
            </div>
            <div className="flex justify-center items-center h-auto w-50p">
              {editingId === data.id ? (
                <input
                  type="text"
                  name="name"
                  value={editedTransaction.name}
                  onChange={handleInputChangeEdit}
                  className="border border-gray-300 p-2 rounded"
                />
              ) : (
                <span className="font-nunito text-lg text-gray-800">
                  {data.name}
                </span>
              )}
            </div>
            <div className="flex justify-center items-center h-auto w-15p">
              {editingId === data.id ? (
                <input
                  type="text"
                  name="amount"
                  value={editedTransaction.amount}
                  onChange={handleInputChangeEdit}
                  className="border border-gray-300 p-2 rounded"
                />
              ) : (
                <span className="font-nunito text-lg text-gray-800">
                  {data.amount}
                </span>
              )}
            </div>
            <div className="flex justify-center items-center h-auto w-15p">
              <span className="font-nunito text-lg text-gray-800">
                {data.date}
              </span>
            </div>
            <div className="flex justify-center items-center h-auto w-15p">
              {editingId === data.id ? (
                <input
                  type="text"
                  name="type"
                  value={editedTransaction.type}
                  onChange={handleInputChangeEdit}
                  className="border border-gray-300 p-2 rounded"
                />
              ) : (
                <span className="font-nunito text-lg text-gray-800 pr-5">
                  {data.type}
                </span>
              )}
            </div>
            <div className="absolute right-5 top-1/2 transform -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {editingId === data.id ? (
                <>
                  <button
                    onClick={handleSaveEdit}
                    className="bg-blue-500 text-white text-sm px-3 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-red-500 text-white text-sm px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEdit(data.id)}
                    className="bg-blue-500 text-white text-sm px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(data.id)}
                    className="bg-red-500 text-white text-sm px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
        {isAdding && (
          <div className="flex items-center justify-between w-full border border-black p-5 border-t-0">
            <div className="flex justify-center items-center h-auto w-5p">
              <span className="font-nunito text-lg text-gray-800">
                {newTransaction.id}
              </span>
            </div>
            <div className="flex justify-center items-center h-auto w-50p">
              <input
                type="text"
                name="name"
                value={newTransaction.name}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded"
                placeholder="Enter Full Name"
              />
            </div>
            <div className="flex justify-center items-center h-auto w-15p">
              <input
                type="text"
                name="amount"
                value={newTransaction.amount}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded"
                placeholder="Enter Amount"
              />
            </div>
            <div className="flex justify-center items-center h-auto w-15p">
              <span className="font-nunito text-lg text-gray-800">
                {newTransaction.date}
              </span>
            </div>
            <div className="flex justify-center items-center h-auto w-15p">
              <input
                type="text"
                name="type"
                value={newTransaction.type}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded"
                placeholder="Enter Type"
              />
            </div>
            <div className="flex gap-2">
              {(newTransaction.name ||
                newTransaction.amount ||
                newTransaction.type) && (
                <button
                  onClick={handleSaveTransaction}
                  className="bg-blue-500 ml-2 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              )}
              <button
                onClick={handleCancel}
                className="bg-red-500 ml-1 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        <div
          className="flex flex-row items-center justify-center w-full border border-black p-5 border-t-0 cursor-pointer"
          onClick={handleAddNewRow}
        >
          <span className="font-nunito text-xl font-bold text-gray-800">
            Add New Transaction Here...
          </span>
          <span className="border-2 border-black bg-white text-black text-xl rounded-full opacity-70 p-1 ml-5">
            <FaPlus />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
