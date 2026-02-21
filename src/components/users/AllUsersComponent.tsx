// import { useCallback, useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router";
// import { getAllUsersApi, updateUserBlockStatus } from "../../api/usersapi";
// import { User } from "../../types/user.types";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import Button from "../ui/button/Button";
// import Pagination from "../ui/pagination/Pagination";
// import { getVerificationStatusColor } from "../../utils/statusUtils";


// type TabType = "All" | "Person" | "Business";
// const IMAGE_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/uploads/profileImage/`;

// const getProfileImage = (user: User): string | null => {
//   const img =
//     user.role === "Business"
//       ? user.businessProfile?.profileImg
//       : user.personProfile?.profileImg;

//   if (!img || img.trim() === "") return null;
//   return img;
// };

// const AllUsersComponent = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   // const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
//   const [activeTab, setActiveTab] = useState<TabType>("All");
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const limit = 10;
//   const navigate = useNavigate();

//   // Fetch users
//   const fetchUsers = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await getAllUsersApi({
//         page: currentPage,
//         limit,
//         search: searchQuery,
//         role: activeTab === "All" ? undefined : activeTab,
//       });

//       setUsers(response.users);
//       setTotalUsers(response.totalUsers);
//     } catch (error: any) {
//       toast.error(error?.response?.data?.message || "Failed to fetch users");
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, searchQuery, activeTab]);

//   useEffect(() => {
//     fetchUsers();
//   }, [fetchUsers]);
//   // Handle block/unblock user
//   const handleBlockToggle = async (userId: string, isBlocked: boolean) => {
//     try {
//       const newBlockStatus = !isBlocked;

//       await updateUserBlockStatus(userId, newBlockStatus);

//       toast.success(
//         newBlockStatus
//           ? "User blocked successfully"
//           : "User unblocked successfully",
//       );

//       fetchUsers(); // refresh list
//     } catch (error: any) {
//       toast.error(error?.response?.data?.message || "Action failed");
//     }
//   };

//   // Navigate to user details
//   const handleUserClick = (userId: string) => {
//     navigate(`/users/details/${userId}`);
//   };

//   const totalPages = Math.ceil(totalUsers / limit);

//   return (
//     <div className="space-y-6">
//       {/* TABLE BOX */}
//       <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
//         {/* TABS */}
//         <div className="border-b border-gray-200 px-6 pt-4 dark:border-gray-700">
//           <div className="flex gap-4">
//             {(["All", "Person", "Business"] as TabType[]).map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`px-4 py-2 font-medium transition-colors ${activeTab === tab
//                   ? "border-b-2 border-brand-500 text-brand-600 dark:text-brand-400"
//                   : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
//                   }`}
//               >
//                 {tab} Users
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* SEARCH BAR */}
//         <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
//           <input
//             type="text"
//             placeholder="Search by email, name, or username..."
//             value={searchQuery}
//             onChange={(e) => {
//               setSearchQuery(e.target.value);
//               setCurrentPage(1);
//             }}
//             className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//           />
//         </div>

//         {/* CONTENT */}
//         {loading ? (
//           <div className="flex justify-center py-12">
//             <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-500 border-t-transparent"></div>
//           </div>
//         ) : users.length === 0 ? (
//           <div className="py-12 text-center text-gray-500 dark:text-gray-400">
//             No users found
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <Table>
//               <TableHeader className="bg-gray-50 dark:bg-gray-800">
//                 <TableRow>
//                   <TableCell
//                     isHeader
//                     className="px-6 py-3 text-xs font-medium uppercase"
//                   >
//                     Profile
//                   </TableCell>


//                   <TableCell
//                     isHeader
//                     className="px-6 py-3 text-xs font-medium uppercase"
//                   >
//                     Email
//                   </TableCell>
//                   <TableCell
//                     isHeader
//                     className="px-6 py-3 text-xs font-medium uppercase"
//                   >
//                     Name
//                   </TableCell>
//                   <TableCell
//                     isHeader
//                     className="px-6 py-3 text-xs font-medium uppercase"
//                   >
//                     Type
//                   </TableCell>
//                   <TableCell
//                     isHeader
//                     className="px-6 py-3 text-xs font-medium uppercase"
//                   >
//                     Registration
//                   </TableCell>
//                   <TableCell
//                     isHeader
//                     className="px-6 py-3 text-xs font-medium uppercase"
//                   >
//                     Status
//                   </TableCell>
//                   {/* <TableCell
//                     isHeader
//                     className="px-6 py-3 text-xs font-medium uppercase"
//                   >
//                     Online
//                   </TableCell> */}
//                   <TableCell
//                     isHeader
//                     className="px-6 py-3 text-xs font-medium uppercase"
//                   >
//                     Created
//                   </TableCell>
//                   <TableCell
//                     isHeader
//                     className="px-6 py-3 text-xs font-medium uppercase"
//                   >
//                     Note
//                   </TableCell>
//                   <TableCell
//                     isHeader
//                     className="px-6 py-3 text-xs font-medium uppercase"
//                   >
//                     Actions
//                   </TableCell>
//                 </TableRow>
//               </TableHeader>

//               <TableBody className="divide-y divide-gray-200 dark:divide-gray-700">
//                 {users.map((user) => (
//                   <TableRow
//                     key={user._id}
//                     onClick={() => handleUserClick(user._id)}
//                     className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
//                   >
//                     <TableCell className="px-6 py-4">
//                       <img
//                         src={
//                           getProfileImage(user)
//                             ? `${IMAGE_BASE_URL}${getProfileImage(user)}`
//                             : "/images/avatar-placeholder.png"
//                         }
//                         alt="profile"
//                         className="h-9 w-9 rounded-full object-cover border"
//                         onError={(e) => {
//                           (e.target as HTMLImageElement).src =
//                             "/images/avatar-placeholder.png";
//                         }}
//                       />
//                     </TableCell>


//                     <TableCell className="px-6 py-4 text-sm">
//                       {user.email}
//                     </TableCell>
//                     <TableCell className="px-6 py-4 text-sm">
//                       {user.role === "Business"
//                         ? user.businessProfile?.businessName || "-"
//                         : user.name || user.username || "-"}
//                     </TableCell>

//                     <TableCell className="px-6 py-4 text-sm">
//                       <span
//                         className={`rounded-full px-2 py-1 text-xs font-semibold ${user.role === "Person"
//                           ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
//                           : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
//                           }`}
//                       >
//                         {user.role}
//                       </span>
//                     </TableCell>
//                     <TableCell className="px-6 py-4 text-sm text-gray-500">
//                       {user.registrationRole || "-"}
//                     </TableCell>


//                     <TableCell className="px-6 py-4 text-sm">
//                       <span
//                         className={`rounded-full px-2 py-1 text-xs font-semibold ${getVerificationStatusColor(
//                           user.verification?.overallStatus
//                         )}`}
//                       >
//                         {user.verification?.overallStatus || "-"}
//                       </span>
//                     </TableCell>
//                     {/* <TableCell className="px-6 py-4">
//                       <span
//                         className={`inline-block h-2 w-2 rounded-full ${user.isOnline ? "bg-green-500" : "bg-gray-400"
//                           }`}
//                       />
//                     </TableCell> */}
//                     <TableCell className="px-6 py-4 text-sm text-gray-500">
//                       {new Date(user.createdAt).toLocaleDateString()}
//                     </TableCell>
//                     <TableCell className="px-6 py-4 text-sm max-w-xs">
//                       <div
//                         className="truncate"
//                         title={user.adminNote || ""}
//                       >
//                         {user.adminNote || "-"}
//                       </div>
//                     </TableCell>

//                     <TableCell className="px-6 py-4">
//                       <Button
//                         size="sm"
//                         variant={user.isBlocked ? "primary" : "outline"}
//                         onClick={(e) => {
//                           e?.stopPropagation();
//                           handleBlockToggle(user._id, user.isBlocked);
//                         }}
//                       >
//                         {user.isBlocked ? "Unblock" : "Block"}
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         )}

//         {/* PAGINATION */}
//         {!loading && users.length > 0 && (
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={setCurrentPage}
//             totalItems={totalUsers}
//             itemsPerPage={limit}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllUsersComponent;
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { getAllUsersApi } from "../../api/usersapi";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Pagination from "../ui/pagination/Pagination";

// React Icons
import { IoSearchOutline, IoChevronDownOutline, IoTriangle, IoFileTrayOutline, IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { formatDistanceToNow } from "date-fns";

type TabType = "Users" | "Content" | "Comments";
const IMAGE_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/uploads/profileImage/`;

const AllUsersComponent = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>("Users");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const limit = 10;
  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    if (activeTab !== "Users") return; // Only fetch if we are on Users tab
    setLoading(true);
    try {
      const response = await getAllUsersApi({
        page: currentPage,
        limit,
        search: searchQuery,
      });
      setUsers(response.users);
      setTotalUsers(response.totalUsers);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery, activeTab]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const getStatusStyles = (status: string) => {
    const s = status?.toLowerCase();
    if (s === "under review" || s === "verification requested") return "bg-[#FEF3C7] text-[#D97706]";
    if (s === "verified") return "bg-[#DCFCE7] text-[#16A34A]";
    return "bg-[#FEE2E2] text-[#EF4444]";
  };

  const totalPages = Math.ceil(totalUsers / limit);

  // --- Reusable Empty State Component ---
  const EmptyState = ({ type }: { type: string }) => (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <div className="bg-gray-50 p-6 rounded-full mb-4">
        {type === "Content" ? (
          <IoFileTrayOutline className="text-5xl text-gray-300" />
        ) : (
          <IoChatbubbleEllipsesOutline className="text-5xl text-gray-300" />
        )}
      </div>
      <h3 className="text-lg font-semibold text-gray-700">{type} Not Available</h3>
      <p className="text-gray-400 text-sm max-w-xs mx-auto">
        There is currently no {type.toLowerCase()} data to display in this section.
      </p>
    </div>
  );

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen font-sans">
      
      {/* SEARCH BAR */}
      <div className="relative mb-6 max-w-md">
        <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
        <input
          type="text"
          placeholder={`Search ${activeTab.toLowerCase()}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-full shadow-sm focus:outline-none text-sm"
        />
      </div>

      {/* TABS */}
      <div className="flex bg-white rounded-2xl shadow-sm border border-gray-100 p-1 mb-8 w-fit overflow-hidden">
        {(["Users", "Content", "Comments"] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-10 py-3 rounded-xl transition-all text-sm font-medium ${
              activeTab === tab ? "bg-[#FEE2E2] text-[#B91C1C]" : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* MAIN CONTAINER */}
      <div className="bg-white rounded-[32px] shadow-sm border border-gray-50 overflow-hidden pb-4 min-h-[400px]">
        
        {/* CONDITIONAL RENDERING BASED ON ACTIVE TAB */}
        {activeTab === "Users" ? (
          <>
            {loading ? (
              <div className="flex justify-center py-20 italic text-gray-400">Loading users...</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-white border-b border-gray-50">
                    <TableRow className="hover:bg-transparent">
                      <TableCell className="w-16 px-6 py-5 text-center">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-red-500" />
                      </TableCell>
                      {["Username", "Type", "Status", "Reason", "Reported by", "When", "Reports"].map((head) => (
                        <TableCell key={head} isHeader className="px-4 py-5 text-[#6B7280] font-normal text-sm">
                          <div className={`flex items-center gap-1 ${head === "Reports" ? "justify-end" : ""}`}>
                            {head}
                            {head !== "When" && <IoChevronDownOutline className="text-gray-400" />}
                          </div>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {users.map((user, index) => {
                      const displayName = user.role === "Business" 
                        ? user.businessProfile?.businessName 
                        : (user.username || user.name || "N/A");
                      
                      const profileImg = user.role === "Business"
                        ? user.businessProfile?.profileImg
                        : user.personProfile?.profileImg;

                      const status = user.verification?.overallStatus || "Unverified";

                      return (
                        <TableRow
                          key={user._id}
                          onClick={() => navigate(`/users/details/${user._id}`)}
                          className={`cursor-pointer border-b border-gray-50 last:border-0 ${
                            index === 2 ? "bg-[#F5F3FF]" : "hover:bg-gray-50"
                          }`}
                        >
                          <TableCell className="px-6 py-4 text-center">
                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                          </TableCell>
                          
                          <TableCell className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-[#22D3EE] overflow-hidden">
                                {profileImg ? (
                                  <img src={`${IMAGE_BASE_URL}${profileImg}`} alt="" className="w-full h-full object-cover" />
                                ) : (
                                   <div className="w-full h-full flex items-center justify-center text-white text-[10px]">IMG</div>
                                )}
                              </div>
                              <span className="text-[#374151] font-medium text-sm truncate max-w-[120px]">
                                  {displayName}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell className="px-4 py-4 text-[#4B5563] text-sm">{user.role}</TableCell>

                          <TableCell className="px-4 py-4">
                            <span className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-tight ${getStatusStyles(status)}`}>
                              {status}
                            </span>
                          </TableCell>

                          <TableCell className="px-4 py-4">
                             <span className="bg-[#FFEDD5] text-[#9A3412] px-3 py-1.5 rounded-lg text-[11px] font-bold">
                               {user.registrationRole || "Other"}
                             </span>
                          </TableCell>

                          <TableCell className="px-4 py-4 text-[#4B5563] text-sm">System</TableCell>

                          <TableCell className="px-4 py-4 text-[#9CA3AF] text-sm">
                            {formatDistanceToNow(new Date(user.createdAt))} ago
                          </TableCell>

                          <TableCell className="px-4 py-4 pr-10">
                            <div className="flex items-center justify-end gap-2">
                              <span className="text-[#374151] font-medium">{index === 2 ? 5 : 1}</span>
                              {index === 2 && (
                                <IoTriangle className="text-[#EF4444] text-lg bg-[#FEE2E2] rounded p-0.5" />
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* PAGINATION (Only for Users) */}
            {!loading && users.length > 0 && (
              <div className="mt-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  totalItems={totalUsers}
                  itemsPerPage={limit}
                />
              </div>
            )}
          </>
        ) : (
          /* SHOW EMPTY STATE FOR CONTENT OR COMMENTS */
          <EmptyState type={activeTab} />
        )}
      </div>
    </div>
  );
};

export default AllUsersComponent;