import React from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from '../services/SupabaseClient';



export default function profile() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [bio,setBio]=useState(data.bio)
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    axios.get(`https://konnection.onrender.com/user/${id}`).then((res) => {
        setData(res.data);
        setBio(res.data.bio)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])

  const handleSave = () => {
    if (bio !== data.bio || selectedImage) {
      const requestBody = {
        bio: bio, 
        image: selectedImage, 
      };

      axios.put(`https://konnection.onrender.com/user/${id}/update`, requestBody)
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    } else {
      console.log("No changes in bio, skipping the update request.");
    }
  };
  const handleImageUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
        const image = e.target.files[0];
        const fileName = `${Date.now()}-${image.name}`;
        try {
            // Upload the image to the Supabase storage
            const { data, error } = await supabase
                .storage
                .from('images')
                .upload(fileName, image);
            if (error) {
                console.error("Upload failed:", error.message);
                return;
            }
            console.log("Uploaded data:", data);
            // Retrieve the public URL for the uploaded image
            const { data: urlData, error: urlError } = supabase
                .storage
                .from('images')
                .getPublicUrl(data.path);
            if (urlError) {
                console.error("Failed to retrieve public URL:", urlError.message);
                return;
            }
            // Set the public URL of the uploaded image
            setSelectedImage(urlData?.publicUrl);
            console.log("File link retrieved successfully:", urlData?.publicUrl);

        } catch (err) {
            console.error("Error during image upload process:", err);
        }
    }
};

  

  return (
    // data && 
    <div className='user-pg flex flex-dir align-centre'>
      <div className='user-header flex flex-dir align-centre justify-centre '>
        <div className='username'>{data.username}</div> 
        <div className='user-under '></div>
      </div>
      <div className=' flex align-centre user-mid-sec '>
      <div className='user-pfp flex align-centre justify-centre  '>

      {selectedImage ? (
                        <img src={selectedImage} alt="Selected" className="pfp-upload flex align-centre justify-centre" />
                    ) : (       
                      <input type="file" data-testid="image-upload" className='pfp-upload flex align-centre justify-centre' placeholder='Upload picture' onChange={handleImageUpload} />
                    )}
  </div>
        <div className='bio-display '>
          <div className='bio-heading' >Describe yourself in few words</div>
          <div className='divider'></div>
          <textarea onChange={(e)=>{setBio(e.target.value);}} name="" id="" className='' value={bio}></textarea>
        </div>
      </div>
      <div>
        <button onClick={handleSave} className='konnect-btn save-btn'>Save</button>
      </div>

      
     
        
    </div>
  )
}
