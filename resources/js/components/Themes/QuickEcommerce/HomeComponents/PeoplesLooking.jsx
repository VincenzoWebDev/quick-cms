import React from 'react';

const PeoplesLooking = () => {
    const items = [
        "Blue diamon almonds",
        "Angie’s Boomchickapop Corn",
        "Salty kettle Corn",
        "Chobani Greek Yogurt",
        "Sweet Vanilla Yogurt",
        "Foster Farms Takeout Crispy wings",
        "Warrior Blend Organic",
        "Chao Cheese Creamy",
        "Chicken meatballs",
        "Blue diamon almonds",
        "Angie’s Boomchickapop Corn",
        "Salty kettle Corn",
        "Chobani Greek Yogurt",
        "Sweet Vanilla Yogurt",
        "Foster Farms Takeout Crispy wings",
        "Warrior Blend Organic",
        "Chao Cheese Creamy",
        "Chicken meatballs",
    ];

    return (
        <section className="py-4">
            <div className="container-lg">
                <h2 className="my-4">People are also looking for</h2>
                {items.map((item, index) => (
                    <a href="#" key={index} className="btn btn-warning me-2 mb-2" data-aos="fade-up" data-aos-delay={index * 150}>
                        {item}
                    </a>
                ))}
            </div>
        </section>
    );
};

export default PeoplesLooking;
