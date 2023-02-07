import { getBlogUser, authUser } from "../../../store";
import {
  useRecoilValue,
  useRecoilState,
  useRecoilRefresher_UNSTABLE,
} from "recoil";
import Sidebar from "../../../component/sidebar";
import Card from "../../../component/card";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import "./index.css";

export default function Dashboard() {
  const user = useRecoilValue(authUser);
  const refreshUser = useRecoilRefresher_UNSTABLE(authUser);
  const [blogs, setBlogs] = useRecoilState(getBlogUser(user.id));
  const [pageNumber, setPageNumber] = useState(0);
  const refresh = useRecoilRefresher_UNSTABLE(getBlogUser(user.id));

  const BlogsPerPage = 3;
  const currPage = pageNumber * BlogsPerPage;

  useEffect(() => {
    refreshUser();
    refresh();
  }, []);

  function displayBlogs(blogs) {
    return blogs.slice(currPage, currPage + BlogsPerPage).map((blog) => (
      <div className="mt-6 lg:mt-0">
        <Card
          id={blog.id}
          title={blog.title}
          created={blog.created_at}
          author={blog.author}
          content={blog.content}
          image={blog.image}
          refresh={refresh}
        />
      </div>
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

        <div className="flex-col md:h-full lg:h-screen h-full mx-10 py-5 w-full">
          <div className="items-center w-full">
            <div>
              <h1 className="lg:text-5xl w-11/12 text-4xl font-bold">
                {user.name} Dashboard
              </h1>
              <p className="my-2 text-sm lg:text-m w-11/12 mb-8">
                this is your dashboard, you can read, edit, or delete your own
                blogs
              </p>
            </div>
          </div>
          {blogs.length == 0 ? (
            <>
              <div className="flex h-5/6 items-center justify-center m-auto">
                <p>kosong</p>
              </div>
            </>
          ) : (
            <>
              <div className="w-full lg:flex items-center justify-evenly lg:h-[70vh]">
                {displayBlogs(blogs)}
              </div>
              <div>
                <ReactPaginate
                  className="flex flex-row justify-center lg:gap-x-5 gap-x-1 mt-8 w-50 text-sm lg:w-100 lg:text-base"
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  pageCount={Math.ceil(blogs.length / BlogsPerPage)}
                  onPageChange={({ selected }) => setPageNumber(selected)}
                  pageLinkClassName={"pageLink"}
                  previousClassName={"pageItem"}
                  containerClassName={"paginationBttn"}
                  previousLinkClassName={"previousBttn"}
                  nextLinkClassName={"nextBttn"}
                  disabledClassName={"paginationDisabled"}
                  activeClassName={"paginationActive"}
                  breakClassName={"paginationBreak"}
                  breakLabel={"..."}
                  forcePage={pageNumber}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={1}
                  subContainerClassName={"paginationSubContainer"}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
