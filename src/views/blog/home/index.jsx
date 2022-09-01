import { useRecoilValue, useRecoilRefresher_UNSTABLE } from "recoil";
import { useState, useEffect } from "react";
import { getBlogs } from "../../../store";
import Sidebar from "../../../component/sidebar";
import Card from "../../../component/card";
import ReactPaginate from "react-paginate";
import "./index.css";

export default function App() {
  const blogs = useRecoilValue(getBlogs);
  const [pageNumber, setPageNumber] = useState(0);
  const refresh = useRecoilRefresher_UNSTABLE(getBlogs);

  const BlogsPerPage = 3;
  const currPage = pageNumber * BlogsPerPage;

  useEffect(() => {
    refresh()
  }, []);

  function displayBlogs(blogs) {
    return blogs
      .slice(currPage, currPage + BlogsPerPage)
      .map((blog) => (
        <Card
          id={blog.id}
          title={blog.title}
          created={blog.created_at}
          author={blog.author}
          content={blog.content}
          image={blog.image}
        />
      ));
  }

  return (
    <>
      <div className="flex flex-row bg-text-bg w-full text-title overflow-auto">
        <div>
          <aside className="h-full">
            <Sidebar />
          </aside>
        </div>

        <div className="flex-col md:h-full lg:h-screen h-full mx-10 py-5 ">
          <div className="items-center w-full">
            <div>
              <h1 className="lg:text-7xl text-4xl md:text-5xl font-bold">
                Home
              </h1>
              <p className="my-1 text-sm lg:text-m">
                start your day with some blogs
              </p>
            </div>
          </div>

          <div className="mt-10 grid lg:grid-cols-3 md:grid-cols-1 grid-cols-1 gap-4">
            {displayBlogs(blogs)}
          </div>
          <div className="">
            <ReactPaginate
              className="flex flex-row justify-center gap-4 mt-8"
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={Math.ceil(blogs.length / BlogsPerPage)}
              onPageChange={({ selected }) => setPageNumber(selected)}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
              breakClassName={"paginationBreak"}
              breakLabel={"..."}
              forcePage={pageNumber}
              marginPagesDisplayed={1}
              pageRangeDisplayed={3}
              subContainerClassName={"paginationSubContainer"}
              activeLinkClassName={"paginationActive"}
            />
          </div>
        </div>
      </div>
    </>
  );
}
