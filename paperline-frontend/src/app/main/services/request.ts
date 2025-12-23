const baseUrl = import.meta.env.VITE_BASEURL!;
async function getAllblogs() {
  try {
    const res = await fetch(`${baseUrl}/api/blogs/`, {});
    const data = await res.json();
    return data.blogs;
  } catch (err) {
    console.log(err);
  }
}

async function getParticularBlog(id: any) {
  try {
    const res = await fetch(`${baseUrl}/api/blogs/blog/${id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export { getAllblogs, getParticularBlog };
