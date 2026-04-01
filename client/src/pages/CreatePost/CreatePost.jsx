import styles from "./CreatePost.module.css";
import AddPost from "../../components/AddPost/AddPost";

export default function CreatePost() {
  return (
    <>
      <h1 className={styles.title}>Create a post</h1>
      <AddPost />
    </>
  );
}
