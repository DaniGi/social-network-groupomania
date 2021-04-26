export function filterPosts(posts, searchValue) {
  if (searchValue.length === 0) {
    return posts;
  }

  const upperCaseSearchValue = searchValue.toUpperCase();
  return posts.filter((post) => {
    return post.username.toUpperCase().indexOf(upperCaseSearchValue) === 0;
  });
}
