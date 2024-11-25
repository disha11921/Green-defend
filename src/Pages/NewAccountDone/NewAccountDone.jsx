import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NewAccountDone.css";

export const NewAccountDone = () => {
    return (
        <section className="new-account-done d-flex align-items-center">
            <Container className="text-center">
                <h2>تم إنشاء حساب بنجاح</h2>
                <p className="my-4">يمكنك تصفح التطبيق الان مع اخر العروض والخصومات</p>
                <Link to="/login" className="btn btn-success py-2 col-6">البدء الان</Link>
            </Container>
        </section>
    )
}