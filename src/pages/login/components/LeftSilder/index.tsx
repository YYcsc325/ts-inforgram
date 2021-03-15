import React, { Component } from "react";
import styles from "./index.less";

class LeftComponent extends Component {
  render() {
    return (
      <div className={styles["signup_sidebar"]}>
        <a href="/" className={styles.logo} title="Infogram" rel="home"></a>
        <h2>Welcome back to Infogram</h2>
        <div className={styles.testimonial}>
          Infogram helps me save literal hours of work. It's one of my most
          invaluable tools with its ability to take my data and intelligently
          map it onto gorgeously designed and animated graphs.
        </div>
        <div className={styles["testimonial_author"]}>
          <img
            src="https://infogram.com/i/frontpage/t-kevin.jpeg"
            alt=""
            style={{ width: "60px", height: "60px" }}
          />
          <span>
            Robert Cen <br /> Associate Editor, TechRadar
          </span>
        </div>
        <div className={styles.testimonial}>
          “With the simplicity of Infogram we can create reports with all the
          detail we need while being easy to read and quick to create.”
        </div>
        <div className={styles["testimonial_author"]}>
          <img
            src="https://cdn.jifo.co/i/frontpage/t-hugo.jpg"
            alt=""
            style={{ width: "60px", height: "60px" }}
          />
          <span>
            Robert Cen <br /> Head of Social Media and Digital Experience, GTB
          </span>
        </div>
        <div className={styles["sidebar_footer"]}>
          <div className={styles["fotter_title"]}>
            Used by many great companies, including:
          </div>
          <img
            src="https://infogram.com/i/frontpage/logos_login.png?v3"
            alt=""
          />
        </div>
      </div>
    );
  }
}
export default LeftComponent;
