import { useState } from "react";
import "./App.css";


function Loginform() {
    const [isSignIn, setIsSignIn] = useState(false);
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (
            !formData.fullName ||
            !formData.email ||
            !formData.password
        ) {
            setMessage("من فضلك قم بإدخال جميع البيانات المطلوبة");
            return;
        }

        if (!formData.email.includes("@")) {
            setMessage("من فضلك أدخل بريدًا إلكترونيًا صحيحًا");
            return;
        }

        if (formData.password.length < 6) {
            setMessage("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
            return;
        }

        setMessage("تم تسجيل الدخول بنجاح 🎉");

        setTimeout(() => {
            window.location.href = "/";
        }, 2000);
    };

    const handleSignInClick = () => {
        setIsSignIn(true);
        setMessage("");
    };

    return (
        <div className={`login-container ${isSignIn ? "sign-in-mode" : ""}`}>
            <div className="form-section">
                <div className="form-content">
                    <h1>{isSignIn ? "Create Account" : "Login"}</h1>

                    <p className="welcome-text">
                        {isSignIn
                            ? "أنشئ حسابك لحجز أفضل مقاعد السينما"
                            : "مرحبًا بك في عالم السينما"}
                    </p>

                    {!isSignIn && (
                        <button className="sign-in-link" onClick={handleSignInClick}>
                            ليس لديك حساب؟ Sign in
                        </button>
                    )}

                    <form onSubmit={handleSubmit}>
                        <label>الاسم الكامل</label>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="أدخل اسمك الكامل"
                            value={formData.fullName}
                            onChange={handleChange}
                        />

                        <label>البريد الإلكتروني</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="example@email.com"
                            value={formData.email}
                            onChange={handleChange}
                        />

                        <label>كلمة المرور</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="أدخل كلمة المرور"
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <button type="submit" className="submit-button">
                            {isSignIn ? "Sign in" : "تسجيل الدخول"}
                        </button>
                    </form>

                    {message && (
                        <p
                            className={`message ${message.includes("بنجاح") ? "success" : "error"
                                }`}
                        >
                            {message}
                        </p>
                    )}
                </div>
            </div>

            <div className="image-section">
                <div className="image-overlay">
                    <h2>احجز تذكرتك الآن</h2>
                    <p>استمتع بأحدث الأفلام وأفضل المقاعد</p>
                </div>
            </div>
        </div>
    );
}

export default  Loginform;