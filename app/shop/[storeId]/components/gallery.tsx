import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Image as ImageType } from "../actions/types";

interface GalleryProps {
  images: ImageType[];
}

const Gallery = ({ images }: GalleryProps) => {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
      {images.map((image, index) => (
        <CarouselItem key={image.id} id={index.toString()} className="flex aspect-square items-center justify-center p-6">
          <figure>
            <img src={image.url} alt={image.url} className="w-full" />

          </figure>

        </CarouselItem>
      ))}
      </CarouselContent>

      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <CarouselPrevious />
      <CarouselNext />
    </div>
    </Carousel>
  );
}

export default Gallery;
