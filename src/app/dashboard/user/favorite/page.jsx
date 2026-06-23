import FavoriteClass from "@/components/user/FavoriteClass";
import { getMyFavoriteClass } from "@/lib/actions/favorite";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const FavoritePage = async () => {
  const user = await getUserSession();
  const favClasses = await getMyFavoriteClass(user?.id);

  return (
    <div>
      <FavoriteClass favClasses={favClasses} user={user} />
    </div>
  );
};

export default FavoritePage;
