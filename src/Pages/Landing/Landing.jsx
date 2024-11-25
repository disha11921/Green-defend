import { Col, Container, Row } from "react-bootstrap";
import "./Landing.css";
import landing from "../../assets/Images/landing.png";
import ellipse1 from "../../assets/Images/Ellipse 1.svg";
import about1 from "../../assets/Images/about-1.png";
import about2 from "../../assets/Images/about-2.png";
import icon from "../../assets/Images/icon.png";
import health from "../../assets/Images/health.png";
import ellipse2 from "../../assets/Images/Ellipse 2.svg";
import about3 from "../../assets/Images/about-3.png";
import frame1 from "../../assets/Images/Frame 51.png";
import frame2 from "../../assets/Images/Frame 52.png";
import ellipse3 from "../../assets/Images/Ellipse 3.svg";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
export const Landing = () => {
  return (
    <>
      <main>
        <Header />
        <section className="landing position-relative">
          <Container className="d-flex align-items-center justify-content-end">
            <img src={landing} alt="" />
            <article className="position-relative z-1">
              <h2>
                نظام الكشف الذكي عن <span>أمراض النباتات</span> ودعم الزراعة
              </h2>
              <p>
                نظام الكشف الذكي عن أمراض النباتات ودعم الزراعة هو منصة مبتكرة
                تستخدم الذكاء الصناعي لتحديد سريع ودقيق لأمراض النباتات. يوفر
                النظام دعمًا شاملاً للمزارعين والمهتمين، ويسهل تبادل المعرفة
                لتحسين ممارسات الزراعة. هدفه هو تحسين الإنتاجية والاستدامة في
                القطاع الزراعي.
              </p>
              <div className="buttons">
              <button onClick={() => window.location.href = 'http://localhost:3000/GreenDefendDashboard/Diagnosis'}>ابدأ</button>
                <button>تنزيل التطبيق</button>
              </div>
            </article>
            <img src={ellipse1} alt="" />
          </Container>
        </section>
        <section className="about section-padding">
          <Container>
            <Row>
              <Col className="col-lg-6 col-sm-12 col-12 col-md-6">
                <img src={about1} className="img-fluid" alt="" />
              </Col>
              <Col className="col-lg-6 col-sm-12 col-12 col-md-6">
                <h3>
                  ثورة في عالم الزراعة من خلال <span>الذكاء الاصطناعي</span>
                </h3>
                <p>
                  مرحبًا بكم في منصتنا الابتكارية المهدفة إلى ثورة في الزراعة من
                  خلال قوة الذكاء الصناعي. نظامنا "الكشف الذكي عن أمراض النباتات
                  ودعم الزراعة" هو مبادرة رائدة مصممة لتحديد أمراض النباتات
                  بسرعة وبدقة، وتمكين المزارعين والمهتمين، وتعزيز ممارسات
                  الزراعة المستدامة.
                </p>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="features section-padding position-relative">
          <Container>
            <h2>
              مزايا <span>جرين ديفيند</span> <img src={health} alt="" />
            </h2>
            <Row className="position-relative z-1">
              <Col className="col-lg-6 col-sm-12 col-12 col-md-6">
                <img src={about2} className="img-fluid" alt="" />
              </Col>
              <Col className="col-lg-6 col-sm-12 col-12 col-md-6">
                <ul>
                  {[
                    "الكشف السريع والدقيق عن الأمراض",
                    "زيادة الوصول إلى الخبرة الزراعية",
                    "تحسين توزيع الموارد والتأثير البيئي",
                    "التعلم والتحسين المستمر",
                    "منصة وتطبيق سهل الاستخدام",
                  ].map((element, key) => (
                    <li key={key}>
                      {element} <img src={icon} width={48} alt="" />
                    </li>
                  ))}
                </ul>
              </Col>
            </Row>
            <img src={ellipse2} alt="" />
          </Container>
        </section>
        <section className="working section-padding">
          <Container>
            <Row>
              <Col className="col-lg-6 col-sm-12 col-12 col-md-6">
                <img src={about1} alt="" />
              </Col>
              <Col className="col-lg-6 col-sm-12 col-12 col-md-6">
                <h3>
                  كيف يعمل تطبيق <span>جرين ديفيند</span>
                </h3>
                <p>
                  يستخدم نظامنا خوارزميات الذكاء الصناعي لتحليل الصور للنباتات
                  التي يقوم المستخدمون بتحميلها. من خلال منصتنا الويب وتطبيق
                  الهاتف المحمول سهل الاستخدام، يمكن للمستخدمين الحصول على تشخيص
                  سريع للأمراض، والوصول إلى معلومات مفصلة حول الأمراض المحددة،
                  والمشاركة في أنشطة مشاركة المعرفة مع الخبراء والمهتمين.
                </p>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="benefits section-padding position-relative">
          <Container>
            <Row className="position-relative z-1">
              <Col className="col-lg-6 col-sm-12 col-12 col-md-6">
                <figure>
                  <img src={frame1} className="img-fluid" alt="" />
                  <figcaption>
                    يستخدم نظامنا خوارزميات الذكاء الصناعي لتحليل الصور للنباتات
                    التي يقوم المستخدمون بتحميلها. من خلال منصتنا الويب وتطبيق
                    الهاتف المحمول سهل الاستخدام، يمكن للمستخدمين الحصول على
                    تشخيص سريع للأمراض، والوصول إلى معلومات مفصلة حول الأمراض
                    المحددة، والمشاركة في أنشطة مشاركة المعرفة مع الخبراء
                    والمهتمين.
                  </figcaption>
                </figure>
              </Col>
              <Col className="col-lg-6 col-sm-12 col-12 col-md-6">
                <h3>
                  فوائد تطبيق <span>جرين ديفيند</span>
                </h3>
                <img src={frame2} alt="" className="img-fluid" />
              </Col>
            </Row>
            <img src={ellipse3} alt="" />
          </Container>
        </section>
        <section className="community section-padding position-relative">
          <Container>
            <Row className="position-relative z-1">
              <Col className="col-lg-6 col-sm-12 col-12 col-md-6">
                <img src={about3} alt="" />
              </Col>
              <Col className="col-lg-6 col-sm-12 col-12 col-md-6">
                <h3>
                  انضم الان الى مجتمع <span>جرين ديفيند</span>
                </h3>
                <p>
                  هل أنت مستعد للانضمام إلى مستقبل الزراعة؟ سجل الآن للوصول إلى
                  منصتنا وابدأ في ثورة الرعاية بالنباتات!
                </p>
                <button>تنزيل التطبيق</button>
              </Col>
            </Row>
            <img src={ellipse3} alt="" />
          </Container>
        </section>
        <Footer />
      </main>
    </>
  );
};
