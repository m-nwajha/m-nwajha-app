import LoginForm from '@/components/organisms/LoginForm';

export const metadata = {
    title: 'تسجيل الدخول | لوحة التحكم',
    description: 'تسجيل الدخول للوصول إلى لوحة تحكم موقع نوجه تك',
};

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-[#0B0D13] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Decorative backgrounds */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full"></div>

            <div className="relative z-10 w-full flex justify-center">
                <LoginForm />
            </div>
        </div>
    );
}
