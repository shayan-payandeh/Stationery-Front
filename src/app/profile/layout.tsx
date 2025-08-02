import Navbar from "./Navbar";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div id="profile-pages-layout" className="flex justify-center">
      {/* <AppBreadCrumb destinations={[{ title: "ناحیه کاربری", link: "/" }]} /> */}
      <div
        id=""
        className="responsive__wrapper grid grid-cols-10 gap-y-8 py-10 lg:grid-cols-12 lg:gap-x-8 xl:grid-cols-10"
      >
        <div className="col-span-10 px-5 md:px-0 lg:col-span-3 xl:col-span-2">
          <Navbar />
        </div>
        <div className="col-span-10 px-5 md:px-0 lg:col-span-9 xl:col-span-8">
          {children}
        </div>
      </div>
    </div>
  );
}

export default layout;
