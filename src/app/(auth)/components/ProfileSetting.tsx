"use client"
import ChangePasswordModal from "@/app/(backend)/components/Modals/UsersModal/ChangePasswordModal";
import Loading from "@/components/shared/Loading";
import { useGetCurrentUser } from "@/hooks/users.hook";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Image from "next/image";
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";

const ProfileSettings = () => {
    const {data:user,isLoading:userLoading}= useGetCurrentUser();
   
    
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: user?.fullName,
    email: user?.email,
    contactNumber:user?.contactNumber,
    address: user?.address,
  });

  const [editData, setEditData] = useState(profileData);
  const [isOpen, setIsOpen] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditData(profileData); // Reset edit data to current profile data
  };

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-xl my-auto mx-auto p-6 bg-white/5 shadow rounded-lg">
        {userLoading&& <Loading/>}
      <h1 className="text-2xl font-bold mb-4">Profile Settings</h1>

      <div className="space-y-4">
        <Image className="mx-auto w-36 h-36 object-fill rounded-full" src={user?.profilePhoto || "https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-314.jpg"} alt={user?.fullName} width={200} height={200} />
        <div className="flex justify-between items-center">
          <span className="font-medium">Full Name:</span>
          <div className=" justify-end text-right">
            {isEditing ? (
              <Input
              size="sm"
                type="text"
                name="fullName"
                value={editData.fullName}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded w-full md:w-48 "
              />
            ) : (
              <span>{profileData.fullName}</span>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-medium">Email:</span>
          <div className=" text-right">
            {isEditing ? (
              <Input
              size="sm"
              
                type="email"
                readOnly
                name="email"
                value={editData.email}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded w-full md:w-48 "
              />
            ) : (
              <span>{profileData.email}</span>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-medium">Contact Number:</span>
          <div className=" text-right">
            {isEditing ? (
              <Input
              size="sm"
                type="text"
                name="contactNumber"
                value={editData.contactNumber}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded w-full md:w-48 "
              />
            ) : (
              <span>{profileData.contactNumber}</span>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-medium">Address:</span>
          <div className=" text-right">
            {isEditing ? (
              <Input
              size="sm"
                type="text"
                name="address"
                value={editData.address}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded w-full md:w-48 "
              />
            ) : (
              <span>{profileData.address}</span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between">
       <div className="flex gap-6 items-center">
       <Button
       variant="bordered"
          onClick={isEditing ? handleSave : handleEditToggle}
          className="flex items-center space-x-2 px-4 py-2 text-white font-medium rounded hover:bg-blue-600"
        >
          <FiEdit />
          <span>{isEditing ? "Save" : "Edit"}</span>
        </Button>

        <Button className="font-medium rounded" variant="bordered" onPress={()=>setIsOpen(true)} >Change Password</Button>
       </div>

        {isEditing && (
          <button
            onClick={handleEditToggle}
            className="px-4 py-2 bg-gray-500 text-white font-medium rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </div>
      {isOpen && <ChangePasswordModal status={""} setIsOpen={setIsOpen} userId={user.id}/> }
    </div>
  );
};

export default ProfileSettings;
