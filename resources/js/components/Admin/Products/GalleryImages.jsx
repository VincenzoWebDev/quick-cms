import { BASE_URL, STORAGE_URL } from "@/constants/constants";
import Fancybox from "../Fancybox";
import { useSelector } from "react-redux";

const GalleryImages = () => {
    const productImages = useSelector((state) => state.product.productImages);

    return (
        <Fancybox
            options={{
                Carousel: { infinite: false, },
                transition: "slide",
            }}>
            <div className="row">
                {
                    productImages.map((image) => (
                        <div className="col-md-2" key={image.id}>
                            <div className="card">
                                <div className="overflow-hidden">
                                    <a data-fancybox="gallery" href={STORAGE_URL + image.image_path} className="d-block">
                                        <img src={STORAGE_URL + image.image_path} alt={`Immagine ${image.id}`} title={`Immagine ${image.id}`} className="img-fluid" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </Fancybox>
    )
}

export default GalleryImages;
