"use client"

import Image from "next/image";
import { Image as ImageType } from "../actions/types";

interface GalleryProps{
images: ImageType[];
}
const Gallery = ({
images,
}:GalleryProps) => {
    return ( 
        <div className="carousel rounded-box">
            {images.map((image) =>(
                <div key={image.id}className="carousel-item w-full">
                    <figure>
                    <img
                    src={image.url}
                    alt={image.url}
                    className="w-full"
                    />
                    </figure>
                </div>
            ))}
       </div>
     );
}
 
export default Gallery;