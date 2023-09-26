import { Link } from "react-router-dom";
import "./category-preview.styles.scss";
import ProductCard from "../product-card/product-card.component";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
const handlePaginationClick = (swiper) => {
  // You can access the clicked pagination index here
  console.log("Pagination Clicked:", swiper.pagination.clickedIndex);
};
const CategoryPreview = ({ title, products }) => {
  return (
    <div className="category-preview-container" 
    style={{}}
    >
      <h2>
        <Link className="title" to={title}>
          {title.toUpperCase()}
        </Link>
      </h2>

      {
        <Swiper
        style={{
            paddingBottom: "10px",
            width: "100%",
        }}
          spaceBetween={10}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          pagination={{
            clickable: true,
            renderBullet: function (index, className) {
              return '<span class="' + className + '" ></span>'; // Only the dots are rendered
            },
          }}
          modules={[Pagination]}
          onSwiper={(swiper) => {
            // Add event listener for pagination click
            swiper.on("paginationClick", handlePaginationClick);
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}
                style={{
                    height: "100%",
                }}
                className="swiper-slide"
            >
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
        // products.filter((_, index) => index < 4).map((product)=>
        //     <ProductCard key={product.id} product={product} />)
      }
    </div>
  );
};

export default CategoryPreview;
