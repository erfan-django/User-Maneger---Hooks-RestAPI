"use client";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

type User = {
    id?: number;
    name: string;
    email: string;
};
export default function UserManager() {
    const [users, setUsers] = useState<User[]>(
        []
    );
    const [loading, setLoading] = useState(true);
    const [editingUser, setEditingUser] =
        useState<User | null>(null);
    const [form, setForm] = useState<User>({
        name: "",
        email: "",
    });
    //  GET - GET Users from Backend with API
    // useEffect(() => {
    //     fetch(
    //         "https://jsonplaceholder.typicode.com/users"
    //     )
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setUsers(data);
    //             setLoading(false);
    //         })
    //         .catch(() =>
    //             toast.error(
    //                 "خطا در دریافت داده‌ها"
    //             )
    //         );
    // }, []);

    useEffect(() => {
        axios.get(
            "https://jsonplaceholder.typicode.com/users"
        )
            .then((res) => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch(() => toast.error("خطا در دریافت داده‌ها"));
    }, []);

    //  POST —   Add New User
    async function addUser() {
        if (!form.name || !form.email) {
            toast.error(
                "لطفاً تمام فیلدها را پر کنید!"
            );
            return;
        }

        // const res = await fetch(
        //     "https://jsonplaceholder.typicode.com/users",
        //     {
        //         method: "POST",
        //         headers: {
        //             "Content-Type":
        //                 "application/json",
        //         },
        //         body: JSON.stringify(form),
        //     }
        //


        const res = await axios.post(
            "https://jsonplaceholder.typicode.com/users", form);
        setUsers((prev) => [...prev, res.data]);
        setForm({ name: "", email: "" });
        toast.success("کاربر جدید اضافه شد 🎉");
    }
    //  PUT — change User
    async function updateUser() {
        if (!editingUser) return;

        // const res = await fetch(
        //     `https://jsonplaceholder.typicode.com/users/${editingUser.id}`,
        //     {
        //         method: "PUT",
        //         headers: {
        //             "Content-Type":
        //                 "application/json",
        //         },
        //         body: JSON.stringify(form),
        //     }
        // );


        const res = await axios.put(
            `https://jsonplaceholder.typicode.com/users/${editingUser.id}`, form);


        setUsers((prev) =>
            prev.map((u) => (u.id === editingUser.id ? res.data : u))
        );
        setEditingUser(null);
        setForm({ name: "", email: "" });
        toast.success("کاربر بروزرسانی شد ✅");
    }

    //  DELETE User
    // async function deleteUser(id: number) {
    //     await fetch(
    //         `https://jsonplaceholder.typicode.com/users/${id}`,
    //         {
    //             method: "DELETE",
    //         }
    //     );

    async function deleteUser(id: number) {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);



        setUsers((prev) =>
            prev.filter((u) => u.id !== id)
        );
        toast.success("کاربر حذف شد 🗑️");
    }

    if (loading)
        return (
            <p className="p-4">
                در حال بارگذاری...
            </p>
        );

    return (
        <div className="p-6 bg-white rounded shadow-lg w-[400px]">
            <Toaster />
            <h1 className="text-2xl font-bold mb-4 text-center text-black">
                مدیریت کاربران 👥
            </h1>

            {/* Form */}
            <div className="mb-6 bg-gray-50 p-4 rounded shadow-inner space-y-2">
                <input
                    type="text"
                    placeholder="نام"
                    value={form.name}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            name: e.target.value,
                        })
                    }
                    className="border rounded p-2 w-full focus:ring focus:ring-blue-200 text-black text-2xl "
                />
                <input
                    type="email"
                    placeholder="ایمیل"
                    value={form.email}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            email: e.target.value,
                        })
                    }
                    className="border rounded p-2 w-full text-black text-2xl focus:ring focus:ring-blue-200"
                />
                {editingUser ? (
                    <button
                        onClick={updateUser}
                        className="bg-yellow-500 text-white px-4 py-2 rounded w-full hover:bg-yellow-600">
                        ذخیره ویرایش
                    </button>
                ) : (
                    <button
                        onClick={addUser}
                        className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700">
                        افزودن کاربر
                    </button>
                )}
            </div>
            {/* Users List */}
            <ul className="space-y-3">
                {users.map((user) => (
                    <li
                        key={user.id}
                        className="border rounded p-3 flex justify-between items-center shadow-sm">
                        <div>
                            <p className="font-semibold text-blue-800 text-2xl ">
                                {user.name}
                            </p>
                            <p className="text-sm text-gray-600">
                                {user.email}
                            </p>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => {
                                    setEditingUser(
                                        user
                                    );
                                    setForm({
                                        name: user.name,
                                        email: user.email,
                                    });
                                }}
                                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">
                                ✏️
                            </button>
                            <button
                                onClick={() =>
                                    deleteUser(
                                        user.id!
                                    )
                                }
                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                                🗑️
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
