import { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Slide.css";

export const Slide = () => {
    useEffect(() => {
        const sliderWrapper = document.querySelector(".slider .slider-wrapper");
        const indicators = document.querySelectorAll(".indicators span");
        const buttons = document.querySelectorAll(".slide button");
        let counter = 0;
        indicators[counter].classList.add("active");
        buttons.forEach(
            button => {
                button.addEventListener("click", () => {
                    indicators.forEach(element => element.classList.remove("active"));
                    counter++;
                    indicators[counter].classList.add("active");
                    sliderWrapper.style.transform = `translateX(-${(100 / 3) * counter}%)`;
                })
            }
        )
    }, []);
    return (
        <section className="slider overflow-x-hidden position-relative">
            <div className="slider-wrapper d-flex">
                <div className="slide w-100 text-white">
                    <Container>
                        <h1>تقديم العلاج الخاص بالنبات <br /> تبعا للمرض</h1>
                        <p className="lh-lg">معرفة العلاج الخاص بالنبات بنقرة <br /> زر بتطبيقنا</p>
                        <Button variant="success" className="col-sm-4 col-10 py-2">التالي</Button>
                    </Container>
                </div>
                <div className="slide w-100 text-white">
                    <Container>
                        <h1>عالج نباتك من <br /> البيت بامان</h1>
                        <p className="lh-lg">عالج نباتاتك من البيت بامان مع تطبيق <br /> GreenDefend </p>
                        <Button variant="success" className="col-sm-4 col-10 py-2">التالي</Button>
                    </Container>
                </div>
                <div className="slide w-100 text-white">
                    <Container>
                        <h1>استكشف انواع امراض <br /> النباتات المختلفة</h1>
                        <p className="lh-lg">تشخيص مرض النبات أصبح في متناول <br /> الجميع</p>
                        <Link to="/login" className="col-sm-4 col-10 py-2 btn btn-success">البدء الان</Link>
                    </Container>
                </div>
            </div>
            <div className="indicators position-absolute">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </section>
    )
}