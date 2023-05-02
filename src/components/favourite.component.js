// import React, { useContext } from "react";
// import styled from "styled-components/native";
// import { AntDesign } from "@expo/vector-icons";
// import { TouchableOpacity } from "react-native";

// import { FavouritesContext } from "../service/favourites/favourites.context";

// // const FavouriteButton = styled(TouchableOpacity)`
// //   position: absolute;
// //   top: 10px;
// //   right: 10px;
// //   z-index: 9;
// // `;

// export const Favorite = ({ pet }) => {
//   const { favourites, addToFavourites, removeFromFavourites } =
//     useContext(FavouritesContext);
//   const isFavourite = favourites.find((r) => r.name === pet.name);
//   return (
//     <TouchableOpacity
//       style={{
//         position: absolute,
//         top: 10,
//         right: 10,
//         zIndex: 9,
//       }}
//       onPress={() =>
//         !isFavourite ? addToFavourites(pet) : removeFromFavourites(pet)
//       }
//     >
//       <AntDesign
//         name={isFavourite ? "heart" : "hearto"}
//         size={24}
//         color={isFavourite ? "red" : "white"}
//       />
//     </TouchableOpacity>
//   );
// };
