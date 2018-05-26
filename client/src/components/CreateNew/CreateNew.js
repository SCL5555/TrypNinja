import React from "react";
import UserStoryTile from "../UserStoryTile"
import {Link} from "react-router-dom";

const CreateNew = (props) => (
      <UserStoryTile
      title="Create a new story"
      src="1527351544730"
      link="/start"
      />
);

export default CreateNew;