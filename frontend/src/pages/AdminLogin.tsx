import AdminForm from "@/components/AdminForm";

const AdminLogin: React.FC = () => {

    return (
        <div className="bg-[#f8f9fa] w-full min-h-screen flex items-center justify-center">
            <div className="max-w-7xl">
                <h1 className="text-[#16161A] text-2xl text-center">Tifa<span className="font-extrabold">Base</span></h1>
                <p className="text-[#16161A] text-lg text-center mt-4">Create your first admin account in order to continue</p>
                <div className="bg-white mt-8 p-8 rounded-lg shadow-lg">
                    <AdminForm />
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;
