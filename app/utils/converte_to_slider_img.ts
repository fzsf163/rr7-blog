import { Post } from "~/types/post_data_type";
import { SliderProps, SliderPropsArray } from "~/types/sliderImageTypes";

// Function to convert post.data to SliderPropsArray
export function convertPostDataToSliderPropsArray(
  post: Post,
): SliderPropsArray {
  const sliderPropsArray: SliderProps[] = post.data.map((item) => ({
    id: item.id,
    img: item.thumbnail,
    header: item.title,
    mainTag: item.category,
    description: item.synopsis,
    authorName: item.author.name,
    authorImage: item.author.image,
  }));

  return { images: sliderPropsArray };
}
