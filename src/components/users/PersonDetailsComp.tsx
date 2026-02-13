// import { useState } from "react";
// import toast from "react-hot-toast";
// import { UserDetail, PersonDetails } from "../../types/user.types";
// import {
//     updateUserRegiStatusApi,
//     updateUserBlockStatus,
//     updateVerificationStatusApi,
//     deleteUserVerificationApi
// } from "../../api/usersapi";
// import Button from "../ui/button/Button";
// import { useNavigate } from "react-router";

// type Props = {
//     user: UserDetail;
//     personProfile: PersonDetails;
//     verification?: any;
//     onUpdate: () => void;
// };

// const IMAGE_URL = import.meta.env.VITE_API_BASE_URL;

// const DetailItem = ({
//     label,
//     value,
// }: {
//     label: string;
//     value?: string | number | null;
// }) => (
//     <div>
//         <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
//         <p className="font-medium text-gray-900 dark:text-white">
//             {value || "-"}
//         </p>
//     </div>
// );

// const PersonDetailsComp = ({
//     user,
//     personProfile,
//     verification,
//     onUpdate,
// }: Props) => {
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);

//     const [imageModal, setImageModal] = useState<string | null>(null);
//     const [zoom, setZoom] = useState(1);

//     const openImageModal = (img: string) => {
//         setImageModal(img);
//         setZoom(1);
//     };

//     const closeImageModal = () => {
//         setImageModal(null);
//     };

//     /* ---------------- USER ACTIONS ---------------- */

//     const handleApprove = async () => {
//         if (!verification?._id) {
//             toast.error("Verification ID not found");
//             return;
//         }

//         setLoading(true);
//         try {
//             await updateUserRegiStatusApi(
//                 user._id,
//                 verification._id,
//                 "Approve"
//             );
//             toast.success("User approved successfully");
//             onUpdate();
//         } catch (err: any) {
//             toast.error(err?.response?.data?.message || "Failed");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleReject = async () => {
//         if (!verification?._id) {
//             toast.error("Verification ID not found");
//             return;
//         }

//         setLoading(true);
//         try {
//             await updateUserRegiStatusApi(
//                 user._id,
//                 verification._id,
//                 "Reject"
//             );
//             toast.success("User rejected successfully");
//             onUpdate();
//         } catch (err: any) {
//             toast.error(err?.response?.data?.message || "Failed");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDeleteVerification = async () => {
//         if (!verification?._id) {
//             toast.error("Verification ID not found");
//             return;
//         }

//         const confirmDelete = window.confirm(
//             "Are you sure you want to delete this verification?"
//         );

//         if (!confirmDelete) return;

//         setLoading(true);

//         try {
//             await deleteUserVerificationApi(verification._id);
//             toast.success("Verification deleted successfully");
//             onUpdate();
//         } catch (err: any) {
//             toast.error(err?.response?.data?.message || "Delete failed");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleBlockToggle = async () => {
//         setLoading(true);
//         try {
//             const newStatus = !user.isBlocked;
//             await updateUserBlockStatus(user._id, newStatus);
//             toast.success(newStatus ? "User blocked" : "User unblocked");
//             onUpdate();
//         } catch (err: any) {
//             toast.error("Failed to update block status");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleVerification = async (status: "Approved" | "Rejected") => {
//         setLoading(true);
//         try {
//             await updateVerificationStatusApi(user._id, status);
//             toast.success(`Verification ${status}`);
//             onUpdate();
//         } catch (err: any) {
//             toast.error("Verification update failed");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const getStatusColor = (status: string) => {
//         switch (status) {
//             case "Approve":
//                 return "bg-green-100 text-green-800";
//             case "Pending":
//                 return "bg-yellow-100 text-yellow-800";
//             case "Reject":
//                 return "bg-red-100 text-red-800";
//             default:
//                 return "bg-gray-100 text-gray-800";
//         }
//     };

//     const detailsArray = personProfile?.details || [];
//     const safeVerification = verification || {};

//     return (
//         <div className="space-y-6">

//             {/* ---------------- HEADER ---------------- */}
//             <div className="flex items-center justify-between">
//                 <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
//                     ← Back
//                 </Button>

//                 <div className="flex gap-3">

//                     {/* Delete Verification Button */}
//                     {verification?._id && (
//                         <Button
//                             variant="outline"
//                             onClick={handleDeleteVerification}
//                             disabled={loading}
//                             className="border-red-500 text-red-600 hover:bg-red-50"
//                         >
//                             Delete Verification
//                         </Button>
//                     )}

//                     {(() => {
//                         const status = safeVerification.liveSelfieVerification?.status;

//                         if (status === "Approved") {
//                             return (
//                                 <Button
//                                     variant="outline"
//                                     onClick={handleReject}
//                                     disabled={loading}
//                                 >
//                                     Reject
//                                 </Button>
//                             );
//                         }

//                         if (status === "Rejected") {
//                             return (
//                                 <Button
//                                     onClick={handleApprove}
//                                     disabled={loading}
//                                 >
//                                     Approve
//                                 </Button>
//                             );
//                         }

//                         return (
//                             <>
//                                 <Button onClick={handleApprove} disabled={loading}>
//                                     Approve
//                                 </Button>
//                                 <Button
//                                     variant="outline"
//                                     onClick={handleReject}
//                                     disabled={loading}
//                                 >
//                                     Reject
//                                 </Button>
//                             </>
//                         );
//                     })()}
//                 </div>

//             </div>

//             {/* ---------------- USER INFO ---------------- */}
//             <div className="rounded-xl shadow border p-6 bg-white dark:bg-gray-900">
//                 <h2 className="text-xl font-bold mb-4">User Information</h2>

//                 <div className="grid md:grid-cols-2 gap-4">
//                     <DetailItem label="Email" value={user.email} />
//                     <DetailItem label="Username" value={user.username} />
//                     <DetailItem label="Name" value={user.name} />
//                     <DetailItem label="Role" value={user.role} />
//                     <DetailItem label="Gender" value={user.registrationRole} />
//                     <DetailItem label="Date of Birth" value={user.dob ? new Date(user.dob).toLocaleDateString() : "-"} />
//                     <DetailItem label="Joined" value={new Date(user.createdAt).toLocaleDateString()} />
//                     <DetailItem label="Online" value={user.isOnline ? "Online" : "Offline"} />
//                     <DetailItem label="Blocked" value={user.isBlocked ? "Yes" : "No"} />
//                     <div>
//                         <p className="text-sm text-gray-500">Status</p>
//                         <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(user.status)}`}>
//                             {user.status}
//                         </span>
//                     </div>
//                 </div>
//             </div>

//             {/* ---------------- PROFILE IMAGE ---------------- */}
//             {personProfile?.profileImg && (
//                 <div className="rounded-xl shadow border p-6 bg-white dark:bg-gray-900 text-center">
//                     <h2 className="text-xl font-bold mb-4">Profile Image</h2>
//                     <img
//                         src={`${IMAGE_URL}/uploads/profileImage/${personProfile.profileImg}`}
//                         alt="Profile"
//                         className="w-40 h-40 object-cover rounded-xl mx-auto border cursor-pointer"
//                         onClick={() =>
//                             openImageModal(`${IMAGE_URL}/${personProfile.profileImg}`)
//                         }
//                     />
//                 </div>
//             )}

//             {/* ---------------- PERSON PROFILE ---------------- */}
//             <div className="rounded-xl shadow border p-6 bg-white dark:bg-gray-900 space-y-4">
//                 <h2 className="text-xl font-bold">Person Profile</h2>

//                 <DetailItem label="About Me" value={personProfile?.aboutMe} />
//                 <DetailItem label="Hosting Status" value={personProfile?.hostingStatus} />
//                 <DetailItem label="Travel Status" value={personProfile?.travelStatus} />

//                 {detailsArray.map((detail: any, index: number) => (
//                     <div key={detail._id} className="border rounded-lg p-4 mt-4">
//                         <h3 className="font-semibold mb-2">
//                             {detailsArray.length > 1 ? `Partner ${index + 1}` : "Details"}
//                         </h3>
//                         <div className="grid md:grid-cols-3 gap-4">
//                             <DetailItem label="Name" value={detail.name} />
//                             <DetailItem label="Height" value={detail.height} />
//                             <DetailItem label="Body Type" value={detail.bodyType} />
//                             <DetailItem label="Sexuality" value={detail.sexuality} />
//                             <DetailItem label="Smoking" value={detail.smoking} />
//                             <DetailItem label="Drinking" value={detail.drinking} />
//                             <DetailItem label="Tattoos" value={detail.tattoos} />
//                             <DetailItem label="Piercings" value={detail.piercings} />
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* ---------------- INTERESTS ---------------- */}
//             <div className="rounded-xl shadow border p-6 bg-white dark:bg-gray-900">
//                 <h2 className="text-xl font-bold mb-4">Interests</h2>
//                 <div className="flex flex-wrap gap-2">
//                     {personProfile?.interests?.length ? (
//                         personProfile.interests.map((interest: any) => (
//                             <span
//                                 key={interest._id}
//                                 className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
//                             >
//                                 {interest.interestName}
//                             </span>
//                         ))
//                     ) : (
//                         <span>-</span>
//                     )}

//                 </div>
//             </div>

//             {/* ---------------- LOOKING FOR ---------------- */}
//             <div className="rounded-xl shadow border p-6 bg-white dark:bg-gray-900">
//                 <h2 className="text-xl font-bold mb-4">Looking For</h2>
//                 <DetailItem
//                     label="Age Range"
//                     value={`${personProfile?.lookingFor?.ageRange?.min || "-"} - ${personProfile?.lookingFor?.ageRange?.max || "-"
//                         }`}
//                 />

//                 <div className="flex flex-wrap gap-2 mt-2">
//                     {personProfile?.lookingFor?.targets?.length ? (
//                         personProfile.lookingFor.targets.map((t: string, i: number) => (
//                             <span key={i} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
//                                 {t}
//                             </span>
//                         ))
//                     ) : (
//                         <span>-</span>
//                     )}
//                 </div>
//             </div>

//             {/* ---------------- VERIFICATION ---------------- */}
//             <div className="rounded-xl shadow border p-6 bg-white dark:bg-gray-900 space-y-6">
//                 <h2 className="text-xl font-bold">Verification</h2>

//                 {/* Overall Info */}
//                 <div className="grid md:grid-cols-2 gap-4">
//                     <DetailItem
//                         label="Overall Status"
//                         value={safeVerification.overallStatus}
//                     />
//                     <DetailItem
//                         label="Attempts"
//                         value={
//                             safeVerification.attempts !== undefined
//                                 ? `${safeVerification.attempts}/${safeVerification.maxAttempts || 0}`
//                                 : "-"
//                         }
//                     />
//                     <DetailItem
//                         label="Manual Review Required"
//                         value={
//                             safeVerification.manualReview?.required
//                                 ? "Yes"
//                                 : safeVerification.manualReview?.required === false
//                                     ? "No"
//                                     : "-"
//                         }
//                     />
//                     <DetailItem
//                         label="Submitted At"
//                         value={
//                             safeVerification.submittedAt
//                                 ? new Date(safeVerification.submittedAt).toLocaleString()
//                                 : "-"
//                         }
//                     />
//                 </div>

//                 {/* ---------------- LIVE SELFIE ---------------- */}
//                 <div className="border rounded-lg p-4 space-y-3">
//                     <h3 className="font-semibold">Live Selfie Verification</h3>

//                     <DetailItem
//                         label="Status"
//                         value={safeVerification.liveSelfieVerification?.status}
//                     />

//                     <DetailItem
//                         label="Confidence Score"
//                         value={safeVerification.liveSelfieVerification?.confidenceScore}
//                     />

//                     <DetailItem
//                         label="Verified At"
//                         value={
//                             safeVerification.liveSelfieVerification?.verifiedAt
//                                 ? new Date(
//                                     safeVerification.liveSelfieVerification.verifiedAt
//                                 ).toLocaleString()
//                                 : "-"
//                         }
//                     />

//                     <DetailItem
//                         label="OCR Text"
//                         value={safeVerification.liveSelfieVerification?.ocrText}
//                     />

//                     {safeVerification.liveSelfieVerification?.image ? (
//                         <img
//                             src={`${IMAGE_URL}/uploads/frames/${safeVerification.liveSelfieVerification.image}`}
//                             className="w-32 h-32 object-cover rounded border cursor-pointer"
//                             onClick={() =>
//                                 openImageModal(
//                                     `${IMAGE_URL}/uploads/frames/${safeVerification.liveSelfieVerification.image}`
//                                 )
//                             }
//                         />
//                     ) : (
//                         <p className="text-sm text-gray-500">Image: -</p>
//                     )}
//                 </div>

//                 {/* ---------------- ID VERIFICATION ---------------- */}
//                 <div className="border rounded-lg p-4 space-y-3">
//                     <h3 className="font-semibold">ID Verification</h3>

//                     <DetailItem
//                         label="Status"
//                         value={safeVerification.verifyId?.status}
//                     />

//                     <DetailItem
//                         label="Verified At"
//                         value={
//                             safeVerification.verifyId?.verifiedAt
//                                 ? new Date(
//                                     safeVerification.verifyId.verifiedAt
//                                 ).toLocaleString()
//                                 : "-"
//                         }
//                     />

//                     <DetailItem
//                         label="OCR Text"
//                         value={safeVerification.verifyId?.ocrText}
//                     />

//                     {safeVerification.verifyId?.document ? (
//                         <img
//                             src={`${IMAGE_URL}/uploads/id/${safeVerification.verifyId.document}`}
//                             className="w-32 h-32 object-cover rounded border cursor-pointer"
//                             onClick={() =>
//                                 openImageModal(
//                                     `${IMAGE_URL}/uploads/id/${safeVerification.verifyId.document}`
//                                 )
//                             }
//                         />
//                     ) : (
//                         <p className="text-sm text-gray-500">Document: -</p>
//                     )}
//                 </div>

//                 {/* Approve / Reject Buttons */}
//                 {safeVerification.overallStatus === "Pending" && (
//                     <div className="flex gap-3 pt-4">
//                         <Button onClick={() => handleVerification("Approved")}>
//                             Approve
//                         </Button>
//                         <Button
//                             variant="outline"
//                             onClick={() => handleVerification("Rejected")}
//                         >
//                             Reject
//                         </Button>
//                     </div>
//                 )}
//             </div>

//             {/* ---------------- IMAGE MODAL ---------------- */}
//             {imageModal && (
//                 <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
//                     <div className="relative">
//                         <img
//                             src={imageModal}
//                             alt="Preview"
//                             style={{ transform: `scale(${zoom})` }}
//                             className="max-h-[80vh] transition-transform duration-200"
//                         />

//                         <div className="absolute top-2 right-2 flex gap-2">
//                             <button
//                                 onClick={() => setZoom((z) => z + 0.2)}
//                                 className="bg-white px-3 py-1 rounded"
//                             >
//                                 +
//                             </button>
//                             <button
//                                 onClick={() => setZoom((z) => Math.max(1, z - 0.2))}
//                                 className="bg-white px-3 py-1 rounded"
//                             >
//                                 -
//                             </button>
//                             <button
//                                 onClick={closeImageModal}
//                                 className="bg-red-500 text-white px-3 py-1 rounded"
//                             >
//                                 ✕
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default PersonDetailsComp;
import { useState } from "react";
import toast from "react-hot-toast";
import { UserDetail, PersonDetails } from "../../types/user.types";
import {
  updateUserRegiStatusApi,
  updateUserBlockStatus,
//   updateVerificationStatusApi,
  deleteUserVerificationApi,
} from "../../api/usersapi";
import { useNavigate } from "react-router";

type Props = {
  user: UserDetail;
  personProfile: PersonDetails;
  verification?: any;
  onUpdate: () => void;
};

const IMAGE_URL = import.meta.env.VITE_API_BASE_URL;

const DetailItem = ({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value?: string | number | null;
  highlight?: boolean;
}) => (
  <div className="space-y-1">
    <p className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
      {label}
    </p>
    <p
      className={`text-sm ${highlight ? "font-semibold text-brand-600 dark:text-brand-400" : "text-gray-700 dark:text-gray-300"}`}
    >
      {value || "-"}
    </p>
  </div>
);

const PersonDetailsComp = ({
  user,
  personProfile,
  verification,
  onUpdate,
}: Props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageModal, setImageModal] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  const openImageModal = (img: string) => {
    setImageModal(img);
    setZoom(1);
  };

  const closeImageModal = () => {
    setImageModal(null);
  };

  const handleApprove = async () => {
    if (!verification?._id) {
      toast.error("Verification ID not found");
      return;
    }
    setLoading(true);
    try {
      await updateUserRegiStatusApi(user._id, verification._id, "Approve");
      toast.success("User approved successfully");
      onUpdate();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!verification?._id) {
      toast.error("Verification ID not found");
      return;
    }
    setLoading(true);
    try {
      await updateUserRegiStatusApi(user._id, verification._id, "Reject");
      toast.success("User rejected successfully");
      onUpdate();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVerification = async () => {
    if (!verification?._id) {
      toast.error("Verification ID not found");
      return;
    }
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this verification?",
    );
    if (!confirmDelete) return;
    setLoading(true);
    try {
      await deleteUserVerificationApi(verification._id);
      toast.success("Verification deleted successfully");
      onUpdate();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const handleBlockToggle = async () => {
    setLoading(true);
    try {
      const newStatus = !user.isBlocked;
      await updateUserBlockStatus(user._id, newStatus);
      toast.success(newStatus ? "User blocked" : "User unblocked");
      onUpdate();
    } catch (err: any) {
      toast.error("Failed to update block status");
    } finally {
      setLoading(false);
    }
  };

  // const handleVerification = async (status: "Approved" | "Rejected") => {
  //     setLoading(true);
  //     try {
  //         await updateVerificationStatusApi(user._id, status);
  //         toast.success(`Verification ${status}`);
  //         onUpdate();
  //     } catch (err: any) {
  //         toast.error("Verification update failed");
  //     } finally {
  //         setLoading(false);
  //     }
  // };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approve":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200";
      case "Pending":
        return "bg-amber-50 text-amber-700 border border-amber-200";
      case "Reject":
        return "bg-rose-50 text-rose-700 border border-rose-200";
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  const detailsArray = personProfile?.details || [];
  const safeVerification = verification || {};

  return (
    <div className="w-full">
      {/* Header Section - Full Width */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleBlockToggle}
              disabled={loading}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                user.isBlocked
                  ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 hover:bg-emerald-100 dark:hover:bg-emerald-950/50"
                  : "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 hover:bg-amber-100 dark:hover:bg-amber-950/50"
              }`}
            >
              {user.isBlocked ? "Unblock User" : "Block User"}
            </button>

            {(() => {
              const status = safeVerification.overallStatus;
              console.log("Verification Status:", status); // Debug log
              if (status === "Approved") {
                return (
                  <button
                    onClick={handleReject}
                    disabled={loading}
                    className="px-4 py-2 text-sm font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-lg transition-colors disabled:opacity-50"
                  >
                    Reject
                  </button>
                );
              }
              if (status === "Rejected") {
                return (
                  <button
                    onClick={handleApprove}
                    disabled={loading}
                    className="px-4 py-2 text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors disabled:opacity-50"
                  >
                    Approve
                  </button>
                );
              }
              return (
                <>
                  <button
                    onClick={handleApprove}
                    disabled={loading}
                    className="px-4 py-2 text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors disabled:opacity-50"
                  >
                    Approve
                  </button>
                  <button
                    onClick={handleReject}
                    disabled={loading}
                    className="px-4 py-2 text-sm font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-lg transition-colors disabled:opacity-50"
                  >
                    Reject
                  </button>
                </>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Main Content - Full Width No Padding */}
      <div className="w-full">
        {/* User Information Card - Full Width */}
        <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              User Information
            </h2>
            <span
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}
            >
              {user.status}
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <DetailItem label="Email" value={user.email} highlight />
            <DetailItem label="Username" value={user.username} />
            <DetailItem label="Full Name" value={user.name} />
            <DetailItem label="Role" value={user.role} />
            <DetailItem label="Gender" value={user.registrationRole} />
            <DetailItem
              label="Date of Birth"
              value={
                user.dob
                  ? new Date(user.dob).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "-"
              }
            />
            <DetailItem
              label="Joined"
              value={new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            />
            <DetailItem
              label="Status"
              value={user.isOnline ? "Online" : "Offline"}
            />
          </div>
        </div>

        {/* Person Profile & Details - Combined Section */}
        <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-6">
          <h2 className="text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-5">
            Person Profile & Details
          </h2>

          <div className="space-y-6">
            {/* Profile Image and Basic Info */}
            <div className="flex flex-col md:flex-row gap-6">
              {personProfile?.profileImg && (
                <div className="flex-shrink-0">
                  <div
                    className="relative group cursor-pointer w-32 h-32"
                    onClick={() =>
                      openImageModal(
                        `${IMAGE_URL}/uploads/profileImage/${personProfile.profileImg}`,
                      )
                    }
                  >
                    <img
                      src={`${IMAGE_URL}/uploads/profileImage/${personProfile.profileImg}`}
                      alt="Profile"
                      className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-700 group-hover:border-brand-500 transition-colors"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-medium">
                        Click to zoom
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <DetailItem
                  label="About Me"
                  value={personProfile?.aboutMe}
                  highlight
                />
                <DetailItem
                  label="Hosting Status"
                  value={personProfile?.hostingStatus}
                />
                <DetailItem
                  label="Travel Status"
                  value={personProfile?.travelStatus}
                />
              </div>
            </div>

            {/* Personal Details Sections */}
            {detailsArray.map((detail: any, index: number) => (
              <div
                key={detail._id}
                className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5"
              >
                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                  {detailsArray.length > 1
                    ? `Partner ${index + 1} Details`
                    : "Personal Details"}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  <DetailItem label="Full Name" value={detail.name} highlight />
                  <DetailItem label="Height" value={detail.height} />
                  <DetailItem label="Body Type" value={detail.bodyType} />
                  <DetailItem label="Sexuality" value={detail.sexuality} />
                  <DetailItem label="Smoking" value={detail.smoking} />
                  <DetailItem label="Drinking" value={detail.drinking} />
                  <DetailItem label="Tattoos" value={detail.tattoos} />
                  <DetailItem label="Piercings" value={detail.piercings} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interests Section */}
        <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-6">
          <h2 className="text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
            Interests
          </h2>
          <div className="flex flex-wrap gap-2">
            {personProfile?.interests?.length ? (
              personProfile.interests.map((interest: any) => (
                <span
                  key={interest._id}
                  className="px-3 py-1.5 bg-brand-50 dark:bg-brand-950/30 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 rounded-full text-sm font-medium"
                >
                  {interest.interestName}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No interests listed
              </span>
            )}
          </div>
        </div>

        {/* Looking For Section */}
        <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-6">
          <h2 className="text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
            Looking For
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DetailItem
                label="Age Range"
                value={`${personProfile?.lookingFor?.ageRange?.min || "-"} - ${personProfile?.lookingFor?.ageRange?.max || "-"}`}
                highlight
              />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
                Target Preferences
              </p>
              <div className="flex flex-wrap gap-2">
                {personProfile?.lookingFor?.targets?.length ? (
                  personProfile.lookingFor.targets.map(
                    (t: string, i: number) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 rounded-full text-sm font-medium"
                      >
                        {t}
                      </span>
                    ),
                  )
                ) : (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    No targets specified
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Verification Section with Delete Button in Corner */}
        <div className="bg-white dark:bg-gray-900 px-6 py-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              Verification Details
            </h2>
            {verification?._id && (
              <button
                onClick={handleDeleteVerification}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-950/50 rounded-lg transition-colors disabled:opacity-50"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete Verification
              </button>
            )}
          </div>

          <div className="space-y-6">
            {/* Overall Info */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <DetailItem
                label="Overall Status"
                value={safeVerification.overallStatus}
                highlight
              />
              <DetailItem
                label="Attempts"
                value={
                  safeVerification.attempts !== undefined
                    ? `${safeVerification.attempts}/${safeVerification.maxAttempts || 0}`
                    : "-"
                }
              />
              <DetailItem
                label="Manual Review"
                value={
                  safeVerification.manualReview?.required
                    ? "Required"
                    : safeVerification.manualReview?.required === false
                      ? "Not Required"
                      : "-"
                }
              />
              <DetailItem
                label="Submitted At"
                value={
                  safeVerification.submittedAt
                    ? new Date(safeVerification.submittedAt).toLocaleString(
                        "en-US",
                        { dateStyle: "medium", timeStyle: "short" },
                      )
                    : "-"
                }
              />
            </div>

            {/* Live Selfie */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5 space-y-4">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Live Selfie Verification
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <DetailItem
                  label="Status"
                  value={safeVerification.liveSelfieVerification?.status}
                  highlight
                />
                <DetailItem
                  label="Confidence Score"
                  value={
                    safeVerification.liveSelfieVerification?.confidenceScore
                  }
                />
                <DetailItem
                  label="Verified At"
                  value={
                    safeVerification.liveSelfieVerification?.verifiedAt
                      ? new Date(
                          safeVerification.liveSelfieVerification.verifiedAt,
                        ).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })
                      : "-"
                  }
                />
                <DetailItem
                  label="OCR Text"
                  value={safeVerification.liveSelfieVerification?.ocrText}
                />
              </div>
              {safeVerification.liveSelfieVerification?.image ? (
                <div>
                  <p className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2">
                    Selfie Image
                  </p>
                  <div
                    className="relative group w-32 h-32 cursor-pointer"
                    onClick={() =>
                      openImageModal(
                        `${IMAGE_URL}/uploads/frames/${safeVerification.liveSelfieVerification.image}`,
                      )
                    }
                  >
                    <img
                      src={`${IMAGE_URL}/uploads/frames/${safeVerification.liveSelfieVerification.image}`}
                      alt="Live Selfie"
                      className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-700 group-hover:border-brand-500 transition-colors"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-medium">
                        Zoom
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No selfie image available
                </p>
              )}
            </div>

            {/* ID Verification */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5 space-y-4">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                  />
                </svg>
                ID Verification
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <DetailItem
                  label="Status"
                  value={safeVerification.verifyId?.status}
                  highlight
                />
                <DetailItem
                  label="Verified At"
                  value={
                    safeVerification.verifyId?.verifiedAt
                      ? new Date(
                          safeVerification.verifyId.verifiedAt,
                        ).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })
                      : "-"
                  }
                />
                <DetailItem
                  label="OCR Text"
                  value={safeVerification.verifyId?.ocrText}
                />
              </div>
              {safeVerification.verifyId?.document ? (
                <div>
                  <p className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2">
                    ID Document
                  </p>
                  <div
                    className="relative group w-32 h-32 cursor-pointer"
                    onClick={() =>
                      openImageModal(
                        `${IMAGE_URL}/uploads/id/${safeVerification.verifyId.document}`,
                      )
                    }
                  >
                    <img
                      src={`${IMAGE_URL}/uploads/id/${safeVerification.verifyId.document}`}
                      alt="ID Document"
                      className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-700 group-hover:border-brand-500 transition-colors"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-medium">
                        Zoom
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No ID document available
                </p>
              )}
            </div>

            {/* Verification Actions */}
            {safeVerification.overallStatus === "Pending" && (
              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleApprove}
                  disabled={loading}
                  className="px-4 py-2 text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Approve Verification"}
                </button>

                <button
                  onClick={handleReject}
                  disabled={loading}
                  className="px-4 py-2 text-sm font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-950/50 rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Reject Verification"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {imageModal && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={closeImageModal}
        >
          <div
            className="relative max-w-7xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-4 right-4 flex gap-2 z-10">
              <button
                onClick={() => setZoom((z) => z + 0.2)}
                className="w-10 h-10 bg-white/90 hover:bg-white text-gray-900 rounded-lg flex items-center justify-center shadow-lg transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
              <button
                onClick={() => setZoom((z) => Math.max(1, z - 0.2))}
                className="w-10 h-10 bg-white/90 hover:bg-white text-gray-900 rounded-lg flex items-center justify-center shadow-lg transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 12H6"
                  />
                </svg>
              </button>
              <button
                onClick={closeImageModal}
                className="w-10 h-10 bg-white/90 hover:bg-white text-gray-900 rounded-lg flex items-center justify-center shadow-lg transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex items-center justify-center min-h-[80vh]">
              <img
                src={imageModal}
                alt="Preview"
                style={{ transform: `scale(${zoom})` }}
                className="max-w-full max-h-[80vh] object-contain transition-transform duration-200"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonDetailsComp;
