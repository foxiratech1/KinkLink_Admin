import React, { useState } from "react";
import DetailItem from "./DetailItem";

// const IMAGE_URL = import.meta.env.VITE_API_BASE_URL;

// type VerificationSectionProps = {
//   verification: any;
//   onApprove: (type: "selfie" | "id") => void;
//   onReject: (type: "selfie" | "id", reason: string) => Promise<void>;
//   onDelete: () => void;
//   onSuspend: () => void;
//   loadingStates: { [key: string]: boolean };
//   onImageClick: (imageUrl: string) => void;
//   loadingGlobal?: boolean;
// };

// const VerificationSection: React.FC<VerificationSectionProps> = ({
//   verification,
//   onApprove,
//   onReject,
//   onDelete,
//   onSuspend,
//   loadingStates,
//   onImageClick,
//   loadingGlobal,
// }) => {
//   const [rejectModalOpen, setRejectModalOpen] = useState(false);
//   const [rejectionReason, setRejectionReason] = useState("");
//   const [rejectType, setRejectType] = useState<"selfie" | "id" | null>(null);

//   const handleOpenRejectModal = (type: "selfie" | "id") => {
//     setRejectType(type);
//     setRejectModalOpen(true);
//   };

//   const submitRejection = async () => {
//     if (rejectType && rejectionReason.trim()) {
//       try {
//         await onReject(rejectType, rejectionReason);
//         setRejectModalOpen(false);
//         setRejectionReason("");
//       } catch (error) {
//         // Keep modal open if rejection fails
//         console.error("Rejection failed", error);
//       }
//     }
//   };

//   return (
//     <div className="bg-white dark:bg-gray-900 px-6 py-6">
//       <div className="flex items-center justify-between mb-5">
//         <h2 className="text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider">
//           Verification Details
//         </h2>

//         <div className="flex items-center gap-2">
//           {verification?._id && (
//             <button
//               onClick={onDelete}
//               disabled={loadingGlobal}
//               className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-950/50 rounded-lg transition-colors disabled:opacity-50"
//             >
//               Delete Verification
//             </button>
//           )}
//         </div>
//       </div>

//       <div className="space-y-6">
//         {/* Overall Info */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           <DetailItem
//             label="Submitted At"
//             value={
//               verification?.metadata?.submissionDate
//                 ? new Date(verification.metadata.submissionDate).toLocaleString(
//                     "en-US",
//                     {
//                       dateStyle: "medium",
//                       timeStyle: "short",
//                     },
//                   )
//                 : "-"
//             }
//           />

//           <DetailItem
//             label="Last Updated"
//             value={
//               verification?.updatedAt
//                 ? new Date(verification.updatedAt).toLocaleString("en-US", {
//                     dateStyle: "medium",
//                     timeStyle: "short",
//                   })
//                 : "-"
//             }
//           />

//           <DetailItem
//             label="ID Required"
//             value={verification?.isIdRequired ? "Yes" : "No"}
//           />

//           <DetailItem
//             label="Selfie Completed"
//             value={verification?.isSelfieCompleted ? "Yes" : "No"}
//           />
//         </div>

//         {/* Live Selfie Verification */}
//         <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5 space-y-4">
//           <div className="flex justify-between items-center">
//             <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
//               Live Selfie Verification
//             </h3>
//             <div className="flex gap-2">
//               {verification?.selfie?.status !== "Approved" && (
//                 <button
//                   onClick={() => onApprove("selfie")}
//                   disabled={loadingStates["approve-selfie"]}
//                   className="px-3 py-1.5 text-xs font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors disabled:opacity-50"
//                 >
//                   {loadingStates["approve-selfie"] ? "Approving..." : "Approve"}
//                 </button>
//               )}
//               {verification?.selfie?.status !== "Rejected" && (
//                 <button
//                   onClick={() => handleOpenRejectModal("selfie")}
//                   disabled={loadingStates["approve-selfie"]}
//                   className="px-3 py-1.5 text-xs font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-lg transition-colors disabled:opacity-50"
//                 >
//                   Reject
//                 </button>
//               )}
//             </div>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             <DetailItem
//               label="Status"
//               value={verification?.selfie?.status}
//               highlight
//             />
//           </div>

//           {verification?.selfie?.image ? (
//             <div
//               className="relative group w-32 h-32 cursor-pointer"
//               onClick={() =>
//                 onImageClick(
//                   `${IMAGE_URL}/uploads/selfie/${verification?.selfie?.image}`,
//                 )
//               }
//             >
//               <img
//                 src={`${IMAGE_URL}/uploads/selfie/${verification?.selfie?.image}`}
//                 alt="Selfie"
//                 className="w-32 h-32 object-cover rounded-lg border"
//               />
//             </div>
//           ) : (
//             <p className="text-sm text-gray-500">No selfie image available</p>
//           )}
//         </div>

//         {/* ID Verification */}
//         <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5 space-y-4">
//           <div className="flex justify-between items-center">
//             <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
//               ID Verification
//             </h3>
//             <div className="flex gap-2">
//               {verification?.verifyId?.status !== "Approved" && (
//                 <button
//                   onClick={() => onApprove("id")}
//                   disabled={loadingStates["approve-id"]}
//                   className="px-3 py-1.5 text-xs font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors disabled:opacity-50"
//                 >
//                   {loadingStates["approve-id"] ? "Approving..." : "Approve"}
//                 </button>
//               )}
//               {verification?.verifyId?.status !== "Rejected" && (
//                 <button
//                   onClick={() => handleOpenRejectModal("id")}
//                   disabled={loadingStates["approve-id"]}
//                   className="px-3 py-1.5 text-xs font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-lg transition-colors disabled:opacity-50"
//                 >
//                   Reject
//                 </button>
//               )}
//             </div>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             <DetailItem
//               label="Status"
//               value={verification?.verifyId?.status}
//               highlight
//             />
//           </div>

//           {verification?.verifyId?.image ? (
//             <div
//               className="relative group w-32 h-32 cursor-pointer"
//               onClick={() =>
//                 onImageClick(
//                   `${IMAGE_URL}/uploads/document/${verification.verifyId.image}`,
//                 )
//               }
//             >
//               <img
//                 src={`${IMAGE_URL}/uploads/document/${verification.verifyId.image}`}
//                 alt="ID Document"
//                 className="w-32 h-32 object-cover rounded-lg border"
//               />
//             </div>
//           ) : (
//             <p className="text-sm text-gray-500">No ID document available</p>
//           )}
//         </div>
//       </div>
//       <div className="mt-8 flex justify-between items-center p-5 bg-rose-50 dark:bg-rose-950/20 rounded-lg border border-rose-100 dark:border-rose-900/30">
//         <div>
//           <h3 className="text-sm font-bold text-rose-900 dark:text-rose-400 uppercase tracking-wider">
//             Suspend Verification
//           </h3>
//           <p className="text-xs text-rose-600/70 dark:text-rose-400/60 mt-1">
//             Mark this verification as suspended.
//           </p>
//         </div>
//         <div className="flex gap-2">
//           {verification && (
//             <button
//               onClick={onSuspend}
//               disabled={
//                 loadingStates["suspend"] ||
//                 verification?.overallStatus === "Suspended"
//               }
//               className="px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors disabled:opacity-50 shadow-sm"
//             >
//               {loadingStates["suspend"]
//                 ? "Suspending..."
//                 : verification?.overallStatus === "Suspended"
//                   ? "Suspended"
//                   : "Suspend Account"}
//             </button>
//           )}
//         </div>
//       </div>
//       {rejectModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
//           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6">
//             <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
//               Reject Verification
//             </h3>

//             <textarea
//               value={rejectionReason}
//               onChange={(e) => setRejectionReason(e.target.value)}
//               placeholder="Enter rejection reason..."
//               className="w-full border rounded-lg p-3 text-sm dark:bg-gray-700 dark:text-white"
//               rows={4}
//             />

//             <div className="flex justify-end gap-3 mt-4">
//               <button
//                 onClick={() => {
//                   setRejectModalOpen(false);
//                   setRejectionReason("");
//                 }}
//                 className="px-4 py-2 text-sm rounded-lg bg-gray-200 hover:bg-gray-300"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={submitRejection}
//                 disabled={
//                   rejectType ? loadingStates[`reject-${rejectType}`] : false
//                 }
//                 className="px-4 py-2 text-sm rounded-lg bg-rose-500 text-white hover:bg-rose-600 disabled:opacity-50"
//               >
//                 {rejectType && loadingStates[`reject-${rejectType}`]
//                   ? "Rejecting..."
//                   : "Reject"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VerificationSection;
const IMAGE_URL = import.meta.env.VITE_API_BASE_URL;

type VerificationSectionProps = {
  user: any;
  verification: any;
  onApprove: (type: "selfie" | "id" | "partnerSelfie" | "partnerId") => void;
  onReject: (
    type: "selfie" | "id" | "partnerSelfie" | "partnerId",
    reason: string,
  ) => Promise<void>;
  onRequestId: () => void; // Parent se function liya
  onDelete: () => void;
  onSuspend: () => void;
  loadingStates: { [key: string]: boolean };
  onImageClick: (imageUrl: string) => void;
  loadingGlobal?: boolean;
};

// const VerificationSection: React.FC<VerificationSectionProps> = ({
//   verification,
//   onApprove,
//   onReject,
//   onRequestId,
//   onDelete,
//   onSuspend,
//   loadingStates,
//   onImageClick,
//   loadingGlobal,
// }) => {
//   const [rejectModalOpen, setRejectModalOpen] = useState(false);
//   const [rejectionReason, setRejectionReason] = useState("");
//   const [rejectType, setRejectType] = useState<"selfie" | "id" | null>(null);

//   // 1. Empty state check: Agar data nahi hai to kuch mat dikhao
//   if (!verification || !verification._id) {
//     return null;
//   }

//   const handleOpenRejectModal = (type: "selfie" | "id") => {
//     setRejectType(type);
//     setRejectModalOpen(true);
//   };

//   const submitRejection = async () => {
//     if (rejectType && rejectionReason.trim()) {
//       try {
//         await onReject(rejectType, rejectionReason);
//         setRejectModalOpen(false);
//         setRejectionReason("");
//       } catch (error) {
//         console.error("Rejection failed", error);
//       }
//     }
//   };

//   const selfieStatus = verification?.selfie?.status;
//   const idStatus = verification?.verifyId?.status;
//   const isSelfieApproved = selfieStatus === "Approved";

//   return (
//     <div className="bg-white dark:bg-gray-900 px-6 py-6">
//       <div className="flex items-center justify-between mb-5">
//         <h2 className="text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider">
//           Verification Details
//         </h2>

//         <div className="flex items-center gap-2">
//           <button
//             onClick={onDelete}
//             disabled={loadingGlobal}
//             className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-950/50 rounded-lg transition-colors disabled:opacity-50"
//           >
//             Delete Verification
//           </button>
//         </div>
//       </div>

//       <div className="space-y-6">
//         {/* Live Selfie Verification */}
//         <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5 space-y-4">
//           <div className="flex justify-between items-center">
//             <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
//               Live Selfie Verification
//             </h3>
//             <div className="flex gap-2">
//               {/* Approve button: Tabhi dikhega jab status approved na ho */}
//               {selfieStatus !== "Approved" && (
//                 <button
//                   onClick={() => onApprove("selfie")}
//                   disabled={loadingStates["approve-selfie"]}
//                   className="px-3 py-1.5 text-xs font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors disabled:opacity-50"
//                 >
//                   {loadingStates["approve-selfie"] ? "Approving..." : "Approve"}
//                 </button>
//               )}
//               {/* Reject button: Tabhi dikhega jab status rejected na ho */}
//               {selfieStatus !== "Rejected" && (
//                 <button
//                   onClick={() => handleOpenRejectModal("selfie")}
//                   disabled={loadingStates["approve-selfie"]}
//                   className="px-3 py-1.5 text-xs font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-lg transition-colors disabled:opacity-50"
//                 >
//                   Reject
//                 </button>
//               )}
//             </div>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             <DetailItem label="Status" value={selfieStatus} highlight />
//           </div>

//           {verification?.selfie?.image && (
//             <div
//               className="relative group w-32 h-32 cursor-pointer"
//               onClick={() =>
//                 onImageClick(
//                   `${IMAGE_URL}/uploads/selfie/${verification?.selfie?.image}`,
//                 )
//               }
//             >
//               <img
//                 src={`${IMAGE_URL}/uploads/selfie/${verification?.selfie?.image}`}
//                 alt="Selfie"
//                 className="w-32 h-32 object-cover rounded-lg border"
//               />
//             </div>
//           )}
//         </div>

//         {/* ID Verification */}
//         <div
//           className={`bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5 space-y-4 ${!isSelfieApproved ? "opacity-50" : ""}`}
//         >
//           <div className="flex justify-between items-center">
//             <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
//               ID Verification
//             </h3>
//             <div className="flex gap-2">
//               {!verification?.isIdRequired ? (
//                 // Agar ID required false h, to request id dikhao (Selfie approve hone k bad hi enable hoga)
//                 <button
//                   onClick={onRequestId}
//                   disabled={loadingGlobal || !isSelfieApproved}
//                   className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50"
//                 >
//                   Request ID
//                 </button>
//               ) : (
//                 // Agar ID required true h, to approve/reject dikhao
//                 <>
//                   {idStatus !== "Approved" && verification?.verifyId?.image && (
//                     <button
//                       onClick={() => onApprove("id")}
//                       disabled={loadingStates["approve-id"]}
//                       className="px-3 py-1.5 text-xs font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors disabled:opacity-50"
//                     >
//                       {loadingStates["approve-id"]
//                         ? "Approving..."
//                         : "Approve ID"}
//                     </button>
//                   )}
//                   {idStatus !== "Rejected" && verification?.verifyId?.image && (
//                     <button
//                       onClick={() => handleOpenRejectModal("id")}
//                       disabled={loadingStates["approve-id"]}
//                       className="px-3 py-1.5 text-xs font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-lg transition-colors disabled:opacity-50"
//                     >
//                       Reject ID
//                     </button>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             <DetailItem
//               label="Status"
//               value={idStatus || "Pending Request"}
//               highlight
//             />
//             {verification?.verifyId?.documentType && (
//               <DetailItem
//                 label="Doc Type"
//                 value={verification.verifyId.documentType}
//               />
//             )}
//           </div>

//           {verification?.verifyId?.image && (
//             <div
//               className="relative group w-32 h-32 cursor-pointer"
//               onClick={() =>
//                 onImageClick(
//                   `${IMAGE_URL}/uploads/document/${verification.verifyId.image}`,
//                 )
//               }
//             >
//               <img
//                 src={`${IMAGE_URL}/uploads/document/${verification.verifyId.image}`}
//                 alt="ID Document"
//                 className="w-32 h-32 object-cover rounded-lg border"
//               />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Suspend Account Section */}
//       <div className="mt-8 flex justify-between items-center p-5 bg-rose-50 dark:bg-rose-950/20 rounded-lg border border-rose-100 dark:border-rose-900/30">
//         <div>
//           <h3 className="text-sm font-bold text-rose-900 dark:text-rose-400 uppercase tracking-wider">
//             Suspend Verification
//           </h3>
//         </div>
//         <button
//           onClick={onSuspend}
//           disabled={
//             loadingStates["suspend"] ||
//             verification?.overallStatus === "Suspended"
//           }
//           className="px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors disabled:opacity-50"
//         >
//           {loadingStates["suspend"]
//             ? "Suspending..."
//             : verification?.overallStatus === "Suspended"
//               ? "Suspended"
//               : "Suspend Account"}
//         </button>
//       </div>

//       {/* Reject Modal */}
//       {rejectModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
//           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6">
//             <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
//               Reject {rejectType}
//             </h3>
//             <textarea
//               value={rejectionReason}
//               onChange={(e) => setRejectionReason(e.target.value)}
//               placeholder="Enter rejection reason..."
//               className="w-full border rounded-lg p-3 text-sm dark:bg-gray-700 dark:text-white"
//               rows={4}
//             />
//             <div className="flex justify-end gap-3 mt-4">
//               <button
//                 onClick={() => setRejectModalOpen(false)}
//                 className="px-4 py-2 text-sm rounded-lg bg-gray-200 hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={submitRejection}
//                 className="px-4 py-2 text-sm rounded-lg bg-rose-500 text-white hover:bg-rose-600"
//               >
//                 Reject Now
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
const VerificationSection: React.FC<VerificationSectionProps> = ({
  user,
  verification,
  onApprove,
  onReject,
  onRequestId,
  onDelete,
  onSuspend,
  loadingStates,
  onImageClick,
  loadingGlobal,
}) => {
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  // Type ko extend kiya partner options ke liye
  const [rejectType, setRejectType] = useState<
    "selfie" | "id" | "partnerSelfie" | "partnerId" | null
  >(null);

  if (!verification || !verification._id) return null;

  const handleOpenRejectModal = (
    type: "selfie" | "id" | "partnerSelfie" | "partnerId",
  ) => {
    setRejectType(type);
    setRejectModalOpen(true);
  };

  const submitRejection = async () => {
    if (rejectType && rejectionReason.trim()) {
      try {
        await onReject(rejectType, rejectionReason);
        setRejectModalOpen(false);
        setRejectionReason("");
      } catch (error) {
        console.error("Rejection failed", error);
      }
    }
  };

  const selfieStatus = verification?.selfie?.status;
  const partnerSelfieStatus = verification?.partnerSelfie?.status;
  const idStatus = verification?.verifyId?.status;
  const partnerIdStatus = verification?.partnerVerifyId?.status;
  const isCouple = [
    "Couple_(FM)",
    "Male_couple_(MM)",
    "Female_couple_(FF)",
  ].includes(user?.registrationRole || "");
  const isSelfieApproved = isCouple
    ? selfieStatus === "Approved" && partnerSelfieStatus === "Approved"
    : selfieStatus === "Approved";

  // Grid class logic: Agar couple hai toh 2 columns, warna 1 column (center aligned)
  const gridClassName = isCouple
    ? "grid grid-cols-1 md:grid-cols-2 gap-8"
    : "flex flex-col max-w-2xl "; // Single user ke liye card center mein aur wide rahega
  return (
    // <div className="bg-white dark:bg-gray-900 px-6 py-6">
    //   {/* --- SELFIE SECTION --- */}
    //   <div className="space-y-6 mb-12">
    //     <div className="flex items-center gap-2 border-l-4 border-blue-600 pl-3">
    //       <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">
    //         Live Selfie Verification
    //       </h3>
    //     </div>

    //     <div className={gridClassName}>
    //       {/* Main User Card */}
    //       <div className="bg-gray-50 dark:bg-gray-800/40 p-5 rounded-2xl border dark:border-gray-800 shadow-sm">
    //         <div className="flex justify-between items-center mb-4">
    //           <span className="text-[10px] font-black text-gray-400 uppercase">
    //             {isCouple ? "Primary Member" : "Profile Selfie"}
    //           </span>
    //           <div className="flex gap-2">
    //             {selfieStatus !== "Approved" && verification.selfie?.image && (
    //               <>
    //                 <button
    //                   onClick={() => onApprove("selfie")}
    //                   className="px-3 py-1 text-[10px] font-bold bg-emerald-500 text-white rounded hover:bg-emerald-600"
    //                 >
    //                   APPROVE
    //                 </button>
    //                 <button
    //                   onClick={() => handleOpenRejectModal("selfie")}
    //                   className="px-3 py-1 text-[10px] font-bold bg-rose-500 text-white rounded hover:bg-rose-600"
    //                 >
    //                   REJECT
    //                 </button>
    //               </>
    //             )}
    //           </div>
    //         </div>
    //         <DetailItem label="Status" value={selfieStatus} highlight />
    //         {verification.selfie?.image ? (
    //           <img
    //             src={`${IMAGE_URL}/uploads/selfie/${verification.selfie.image}`}
    //             className="w-full h-64 md:h-80 object-cover rounded-xl mt-3 cursor-pointer border dark:border-gray-700"
    //             onClick={() =>
    //               onImageClick(
    //                 `${IMAGE_URL}/uploads/selfie/${verification.selfie.image}`,
    //               )
    //             }
    //           />
    //         ) : selfieStatus === "Approved" ? (
    //           <div className="h-48 flex items-center justify-center bg-emerald-50 dark:bg-emerald-900/10 rounded-xl mt-3 text-emerald-600 font-bold text-sm border border-emerald-100">
    //             ✓ Image Verified & Archived
    //           </div>
    //         ) : null}
    //       </div>

    //       {/* Partner Card (Only for Couples) */}
    //       {isCouple && (
    //         <div className="bg-gray-50 dark:bg-gray-800/40 p-5 rounded-2xl border dark:border-gray-800 shadow-sm">
    //           <div className="flex justify-between items-center mb-4">
    //             <span className="text-[10px] font-black text-blue-500 uppercase">
    //               Partner Member
    //             </span>
    //             <div className="flex gap-2">
    //               {partnerSelfieStatus !== "Approved" &&
    //                 verification.partnerSelfie?.image && (
    //                   <>
    //                     <button
    //                       onClick={() => onApprove("partnerSelfie")}
    //                       className="px-3 py-1 text-[10px] font-bold bg-emerald-500 text-white rounded hover:bg-emerald-600"
    //                     >
    //                       APPROVE
    //                     </button>
    //                     <button
    //                       onClick={() => handleOpenRejectModal("partnerSelfie")}
    //                       className="px-3 py-1 text-[10px] font-bold bg-rose-500 text-white rounded hover:bg-rose-600"
    //                     >
    //                       REJECT
    //                     </button>
    //                   </>
    //                 )}
    //             </div>
    //           </div>
    //           <DetailItem
    //             label="Status"
    //             value={partnerSelfieStatus}
    //             highlight
    //           />
    //           {verification.partnerSelfie?.image ? (
    //             <img
    //               src={`${IMAGE_URL}/uploads/partnerSelfie/${verification.partnerSelfie.image}`}
    //               className="w-full h-64 md:h-80 object-cover rounded-xl mt-3 cursor-pointer border dark:border-gray-700"
    //               onClick={() =>
    //                 onImageClick(
    //                   `${IMAGE_URL}/uploads/partnerSelfie/${verification.partnerSelfie.image}`,
    //                 )
    //               }
    //             />
    //           ) : partnerSelfieStatus === "Approved" ? (
    //             <div className="h-48 flex items-center justify-center bg-emerald-50 dark:bg-emerald-900/10 rounded-xl mt-3 text-emerald-600 font-bold text-sm border border-emerald-100">
    //               ✓ Partner Verified & Archived
    //             </div>
    //           ) : (
    //             <div className="h-48 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl mt-3 text-gray-400 text-xs italic">
    //               Waiting for Partner Selfie...
    //             </div>
    //           )}
    //         </div>
    //       )}
    //     </div>
    //   </div>

    //   {/* --- ID SECTION --- */}
    //   <div className={`space-y-6 ${!isSelfieApproved ? "opacity-40" : ""}`}>
    //     <div className="flex justify-between items-center border-l-4 border-amber-500 pl-3">
    //       <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">
    //         Identity Documents
    //       </h3>
    //       {!verification?.isIdRequired && (
    //         <button
    //           onClick={onRequestId}
    //           disabled={!isSelfieApproved}
    //           className="px-6 py-2 bg-blue-600 text-white text-xs font-bold rounded-full hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all"
    //         >
    //           REQUEST DOCUMENTS
    //         </button>
    //       )}
    //     </div>

    //     <div className={gridClassName}>
    //       {/* Main ID Card */}
    //       <div className="bg-gray-50 dark:bg-gray-800/40 p-5 rounded-2xl border dark:border-gray-800 shadow-sm">
    //         <div className="flex justify-between items-center mb-4">
    //           <span className="text-[10px] font-black text-gray-400 uppercase">
    //             {isCouple ? "Primary ID" : "ID Document"}
    //           </span>
    //           <div className="flex gap-2">
    //             {idStatus !== "Approved" && verification.verifyId?.image && (
    //               <>
    //                 <button
    //                   onClick={() => onApprove("id")}
    //                   className="px-3 py-1 text-[10px] font-bold bg-emerald-500 text-white rounded hover:bg-emerald-600"
    //                 >
    //                   APPROVE
    //                 </button>
    //                 <button
    //                   onClick={() => handleOpenRejectModal("id")}
    //                   className="px-3 py-1 text-[10px] font-bold bg-rose-500 text-white rounded hover:bg-rose-600"
    //                 >
    //                   REJECT
    //                 </button>
    //               </>
    //             )}
    //           </div>
    //         </div>
    //         <div className="my-5 flex justify-between gap-4">
    //           <DetailItem
    //             label="Status"
    //             value={idStatus || "Not Requested"}
    //             highlight
    //           />
    //           {verification.verifyId?.documentType && (
    //             <DetailItem
    //               label="Type"
    //               value={verification.verifyId.documentType}
    //               highlight
    //             />
    //           )}
    //         </div>
    //         {verification.verifyId?.image ? (
    //           <img
    //             src={`${IMAGE_URL}/uploads/document/${verification.verifyId.image}`}
    //             className="w-full h-48 object-contain bg-black rounded-xl mt-3 cursor-pointer"
    //             onClick={() =>
    //               onImageClick(
    //                 `${IMAGE_URL}/uploads/document/${verification.verifyId.image}`,
    //               )
    //             }
    //           />
    //         ) : idStatus === "Approved" ? (
    //           <div className="h-40 flex items-center justify-center bg-emerald-50 dark:bg-emerald-900/10 rounded-xl mt-3 text-emerald-600 font-bold text-sm">
    //             ✓ ID Verified & Archived
    //           </div>
    //         ) : null}
    //       </div>

    //       {/* Partner ID Card (Only for Couples) */}
    //       {isCouple && (
    //         <div className="bg-gray-50 dark:bg-gray-800/40 p-5 rounded-2xl border dark:border-gray-800 shadow-sm">
    //           <div className="flex justify-between items-center mb-4">
    //             <span className="text-[10px] font-black text-blue-500 uppercase">
    //               Partner ID
    //             </span>
    //             <div className="flex gap-2">
    //               {partnerIdStatus !== "Approved" &&
    //                 verification.partnerVerifyId?.image && (
    //                   <>
    //                     <button
    //                       onClick={() => onApprove("partnerId")}
    //                       className="px-3 py-1 text-[10px] font-bold bg-emerald-500 text-white rounded hover:bg-emerald-600"
    //                     >
    //                       APPROVE
    //                     </button>
    //                     <button
    //                       onClick={() => handleOpenRejectModal("partnerId")}
    //                       className="px-3 py-1 text-[10px] font-bold bg-rose-500 text-white rounded hover:bg-rose-600"
    //                     >
    //                       REJECT
    //                     </button>
    //                   </>
    //                 )}
    //             </div>
    //           </div>
    //           <div className="my-5 flex justify-between gap-4">
    //             <DetailItem
    //               label="Status"
    //               value={partnerIdStatus || "Not Requested"}
    //               highlight
    //             />
    //             {verification.partnerVerifyId?.documentType && (
    //               <DetailItem
    //                 label="Type"
    //                 value={verification.partnerVerifyId.documentType}
    //                 highlight
    //               />
    //             )}
    //           </div>
    //           {verification.partnerVerifyId?.image ? (
    //             <img
    //               src={`${IMAGE_URL}/uploads/partnerId/${verification.partnerVerifyId.image}`}
    //               className="w-full h-48 object-contain bg-black rounded-xl mt-3 cursor-pointer"
    //               onClick={() =>
    //                 onImageClick(
    //                   `${IMAGE_URL}/uploads/partnerId/${verification.partnerVerifyId.image}`,
    //                 )
    //               }
    //             />
    //           ) : partnerIdStatus === "Approved" ? (
    //             <div className="h-40 flex items-center justify-center bg-emerald-50 dark:bg-emerald-900/10 rounded-xl mt-3 text-emerald-600 font-bold text-sm">
    //               ✓ Partner ID Verified & Archived
    //             </div>
    //           ) : (
    //             <div className="h-40 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl mt-3 text-gray-400 text-xs italic">
    //               Waiting for ID Request...
    //             </div>
    //           )}
    //         </div>
    //       )}
    //     </div>
    //   </div>
    //   {/* Reject Modal */}
    //   {rejectModalOpen && (
    //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
    //       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6">
    //         <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
    //           Reject {rejectType}
    //         </h3>
    //         <textarea
    //           value={rejectionReason}
    //           onChange={(e) => setRejectionReason(e.target.value)}
    //           placeholder="Enter rejection reason..."
    //           className="w-full border rounded-lg p-3 text-sm dark:bg-gray-700 dark:text-white"
    //           rows={4}
    //         />
    //         <div className="flex justify-end gap-3 mt-4">
    //           <button
    //             onClick={() => setRejectModalOpen(false)}
    //             className="px-4 py-2 text-sm rounded-lg bg-gray-200 hover:bg-gray-300"
    //           >
    //             Cancel
    //           </button>
    //           <button
    //             onClick={submitRejection}
    //             className="px-4 py-2 text-sm rounded-lg bg-rose-500 text-white hover:bg-rose-600"
    //           >
    //             Reject Now
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </div>
    <div className="bg-white dark:bg-gray-900 px-6 py-6">
      {/* --- SELFIE SECTION --- */}
      <div className="space-y-6 mb-12">
        <div className="flex items-center gap-2 border-l-4 border-blue-600 pl-3">
          <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">
            Live Selfie Verification
          </h3>
        </div>

        <div className={gridClassName}>
          {/* Main User Card */}
          <div className="bg-gray-50 dark:bg-gray-800/40 p-5 rounded-2xl border dark:border-gray-800 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-black text-gray-400 uppercase">
                {isCouple ? "Primary Member" : "Profile Selfie"}
              </span>
              <div className="flex gap-2">
                {selfieStatus !== "Approved" && verification.selfie?.image && (
                  <>
                    <button
                      onClick={() => onApprove("selfie")}
                      disabled={loadingStates?.selfie || loadingGlobal}
                      className="px-3 py-1 text-[10px] font-bold bg-emerald-500 text-white rounded hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed min-w-[70px]"
                    >
                      {loadingStates?.selfie ? "..." : "APPROVE"}
                    </button>
                    <button
                      onClick={() => handleOpenRejectModal("selfie")}
                      disabled={loadingStates?.selfie || loadingGlobal}
                      className="px-3 py-1 text-[10px] font-bold bg-rose-500 text-white rounded hover:bg-rose-600 disabled:opacity-50"
                    >
                      REJECT
                    </button>
                  </>
                )}
              </div>
            </div>
            {/* ... Rest of Main User Card UI ... */}
            <DetailItem label="Status" value={selfieStatus} highlight />
            {verification.selfie?.image ? (
              <img
                src={`${IMAGE_URL}/uploads/selfie/${verification.selfie.image}`}
                className="w-full h-64 md:h-80 object-cover rounded-xl mt-3 cursor-pointer border dark:border-gray-700"
                onClick={() =>
                  onImageClick(
                    `${IMAGE_URL}/uploads/selfie/${verification.selfie.image}`,
                  )
                }
              />
            ) : selfieStatus === "Approved" ? (
              <div className="h-48 flex items-center justify-center bg-emerald-50 dark:bg-emerald-900/10 rounded-xl mt-3 text-emerald-600 font-bold text-sm border border-emerald-100">
                ✓ Image Verified & Archived
              </div>
            ) : null}
          </div>

          {/* Partner Card */}
          {isCouple && (
            <div className="bg-gray-50 dark:bg-gray-800/40 p-5 rounded-2xl border dark:border-gray-800 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black text-blue-500 uppercase">
                  Partner Member
                </span>
                <div className="flex gap-2">
                  {partnerSelfieStatus !== "Approved" &&
                    verification.partnerSelfie?.image && (
                      <>
                        <button
                          onClick={() => onApprove("partnerSelfie")}
                          disabled={
                            loadingStates?.partnerSelfie || loadingGlobal
                          }
                          className="px-3 py-1 text-[10px] font-bold bg-emerald-500 text-white rounded hover:bg-emerald-600 disabled:opacity-50 min-w-[70px]"
                        >
                          {loadingStates?.partnerSelfie ? "..." : "APPROVE"}
                        </button>
                        <button
                          onClick={() => handleOpenRejectModal("partnerSelfie")}
                          disabled={
                            loadingStates?.partnerSelfie || loadingGlobal
                          }
                          className="px-3 py-1 text-[10px] font-bold bg-rose-500 text-white rounded hover:bg-rose-600 disabled:opacity-50"
                        >
                          REJECT
                        </button>
                      </>
                    )}
                </div>
              </div>
              {/* ... Rest of Partner Card UI ... */}
              <DetailItem
                label="Status"
                value={partnerSelfieStatus}
                highlight
              />
              {verification.partnerSelfie?.image ? (
                <img
                  src={`${IMAGE_URL}/uploads/partnerSelfie/${verification.partnerSelfie.image}`}
                  className="w-full h-64 md:h-80 object-cover rounded-xl mt-3 cursor-pointer border dark:border-gray-700"
                  onClick={() =>
                    onImageClick(
                      `${IMAGE_URL}/uploads/partnerSelfie/${verification.partnerSelfie.image}`,
                    )
                  }
                />
              ) : partnerSelfieStatus === "Approved" ? (
                <div className="h-48 flex items-center justify-center bg-emerald-50 dark:bg-emerald-900/10 rounded-xl mt-3 text-emerald-600 font-bold text-sm border border-emerald-100">
                  ✓ Partner Verified & Archived
                </div>
              ) : (
                <div className="h-48 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl mt-3 text-gray-400 text-xs italic">
                  Waiting for Partner Selfie...
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* --- ID SECTION --- */}
      <div className={`space-y-6 ${!isSelfieApproved ? "opacity-40" : ""}`}>
        <div className="flex justify-between items-center border-l-4 border-amber-500 pl-3">
          <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">
            Identity Documents
          </h3>
          {!verification?.isIdRequired && (
            <button
              onClick={onRequestId}
              disabled={!isSelfieApproved || loadingGlobal}
              className="px-6 py-2 bg-blue-600 text-white text-xs font-bold rounded-full hover:bg-blue-700 shadow-lg disabled:opacity-50"
            >
              {loadingGlobal ? "SENDING..." : "REQUEST IDS"}
            </button>
          )}
        </div>

        <div className={gridClassName}>
          {/* Main ID Card */}
          <div className="bg-gray-50 dark:bg-gray-800/40 p-5 rounded-2xl border dark:border-gray-800 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-black text-gray-400 uppercase">
                {isCouple ? "Primary ID" : "ID Document"}
              </span>
              <div className="flex gap-2">
                {idStatus !== "Approved" && verification.verifyId?.image && (
                  <>
                    <button
                      onClick={() => onApprove("id")}
                      disabled={loadingStates?.id || loadingGlobal}
                      className="px-3 py-1 text-[10px] font-bold bg-emerald-500 text-white rounded hover:bg-emerald-600 disabled:opacity-50 min-w-[70px]"
                    >
                      {loadingStates?.id ? "..." : "APPROVE"}
                    </button>
                    <button
                      onClick={() => handleOpenRejectModal("id")}
                      disabled={loadingStates?.id || loadingGlobal}
                      className="px-3 py-1 text-[10px] font-bold bg-rose-500 text-white rounded hover:bg-rose-600 disabled:opacity-50"
                    >
                      REJECT
                    </button>
                  </>
                )}
              </div>
            </div>
            {/* ... Rest of ID Card UI ... */}
            <div className="my-5 flex justify-between gap-4">
              <DetailItem
                label="Status"
                value={idStatus || "Not Requested"}
                highlight
              />
              {verification.verifyId?.documentType && (
                <DetailItem
                  label="Type"
                  value={verification.verifyId.documentType}
                  highlight
                />
              )}
            </div>
            {verification.verifyId?.image ? (
              <img
                src={`${IMAGE_URL}/uploads/document/${verification.verifyId.image}`}
                className="w-full h-48 object-contain bg-black rounded-xl mt-3 cursor-pointer"
                onClick={() =>
                  onImageClick(
                    `${IMAGE_URL}/uploads/document/${verification.verifyId.image}`,
                  )
                }
              />
            ) : idStatus === "Approved" ? (
              <div className="h-40 flex items-center justify-center bg-emerald-50 dark:bg-emerald-900/10 rounded-xl mt-3 text-emerald-600 font-bold text-sm">
                ✓ ID Verified & Archived
              </div>
            ) : null}
          </div>

          {/* Partner ID Card */}
          {isCouple && (
            <div className="bg-gray-50 dark:bg-gray-800/40 p-5 rounded-2xl border dark:border-gray-800 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black text-blue-500 uppercase">
                  Partner ID
                </span>
                <div className="flex gap-2">
                  {partnerIdStatus !== "Approved" &&
                    verification.partnerVerifyId?.image && (
                      <>
                        <button
                          onClick={() => onApprove("partnerId")}
                          disabled={loadingStates?.partnerId || loadingGlobal}
                          className="px-3 py-1 text-[10px] font-bold bg-emerald-500 text-white rounded hover:bg-emerald-600 disabled:opacity-50 min-w-[70px]"
                        >
                          {loadingStates?.partnerId ? "..." : "APPROVE"}
                        </button>
                        <button
                          onClick={() => handleOpenRejectModal("partnerId")}
                          disabled={loadingStates?.partnerId || loadingGlobal}
                          className="px-3 py-1 text-[10px] font-bold bg-rose-500 text-white rounded hover:bg-rose-600 disabled:opacity-50"
                        >
                          REJECT
                        </button>
                      </>
                    )}
                </div>
              </div>
              {/* ... Rest of Partner ID UI ... */}
              <div className="my-5 flex justify-between gap-4">
                <DetailItem
                  label="Status"
                  value={partnerIdStatus || "Not Requested"}
                  highlight
                />
                {verification.partnerVerifyId?.documentType && (
                  <DetailItem
                    label="Type"
                    value={verification.partnerVerifyId.documentType}
                    highlight
                  />
                )}
              </div>
              {verification.partnerVerifyId?.image ? (
                <img
                  src={`${IMAGE_URL}/uploads/partnerId/${verification.partnerVerifyId.image}`}
                  className="w-full h-48 object-contain bg-black rounded-xl mt-3 cursor-pointer"
                  onClick={() =>
                    onImageClick(
                      `${IMAGE_URL}/uploads/partnerId/${verification.partnerVerifyId.image}`,
                    )
                  }
                />
              ) : partnerIdStatus === "Approved" ? (
                <div className="h-40 flex items-center justify-center bg-emerald-50 dark:bg-emerald-900/10 rounded-xl mt-3 text-emerald-600 font-bold text-sm">
                  ✓ Partner ID Verified & Archived
                </div>
              ) : (
                <div className="h-40 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl mt-3 text-gray-400 text-xs italic">
                  Waiting for ID Request...
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Reject Modal */}
      {rejectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Reject {rejectType}
            </h3>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter rejection reason..."
              className="w-full border rounded-lg p-3 text-sm dark:bg-gray-700 dark:text-white"
              rows={4}
              disabled={rejectType ? loadingStates?.[rejectType] : false}
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setRejectModalOpen(false)}
                disabled={rejectType ? loadingStates?.[rejectType] : false}
                className="px-4 py-2 text-sm rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={submitRejection}
                disabled={
                  !rejectionReason.trim() ||
                  (rejectType ? loadingStates?.[rejectType] : false)
                }
                className="px-4 py-2 text-sm rounded-lg bg-rose-500 text-white hover:bg-rose-600 disabled:opacity-50 flex items-center gap-2"
              >
                {rejectType && loadingStates?.[rejectType]
                  ? "Rejecting..."
                  : "Reject Now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default VerificationSection;
