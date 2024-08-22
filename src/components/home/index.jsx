"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import {
  useCreateAnimalMutation,
  useGetAllAnimalsQuery,
} from "@/redux/features/api/animalApi";
import { imageUpload } from "@/utils/ImageUpload";

const tapData = [
  {
    id: 1,
    tap: "Land Animal",
  },
  {
    id: 2,
    tap: "Bird",
  },
  {
    id: 3,
    tap: "Fish",
  },
  {
    id: 4,
    tap: "Insect",
  },
];

const HomePage = () => {
  const { data, isLoading, error } = useGetAllAnimalsQuery({});
  const [animalData, setAnimalData] = useState("Land Animal");
  const [animal, setAnimal] = useState({});
  const [createAnimal] = useCreateAnimalMutation();
  const [isOpenCategoryModal, setIsOpenCategoryModel] = useState(false);
  const [categoryText, setCategoryText] = useState("");
  const filterAnimalData = data?.data?.filter(
    (info) => info.category === animalData
  );


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmitAnimal = async (data) => {
    const imageURL = await imageUpload(data.image[0]);
    const payload = {
      name: data?.name,
      image: imageURL,
    };
    // set animal information to state
    setAnimal(payload);
    // after set animal then close the modal
    document.getElementById("my_modal_2").close();
  };

  const handleSaveAniaml = async (data) => {
    const payload = animal;
    payload.category = categoryText;
    console.log(payload);

    try {
      const res = await createAnimal(payload);
      console.log(res);
      alert("Animal create successfull");
      setIsOpenCategoryModel(false);
    } catch (error) {
      alert(error.message || "Somthing wrong pelase try again");
      throw new error(error.message);
    }
  };


  if(isLoading){
    return <p className="h-screen text-white font-bold text-2xl p-20">Data is Loading .....</p>
     
  }

  return (
    <div className="h-full md:h-screen">
      <div className="md:flex justify-between items-center px-4 md:px-20 py-10">
        {/* tap  */}
        <div className="flex gap-3 md:gap-10 pb-5 md:pb-0">
          {tapData?.map((tap) => {
            return (
              <div key={tap.id}>
                <button
                  onClick={() => setAnimalData(tap.tap)}
                  className="text-red-500 hover:text-green-500 text-lg font-bold py-1 px-4 rounded-[12px] border border-red-500 hover:border-green-500"
                >
                  {tap.tap}
                </button>
              </div>
            );
          })}
        </div>

        {/* button  */}
        <div className="flex gap-3 md:gap-10">
          <button
            onClick={() => document.getElementById("my_modal_2").showModal()}
            className="text-red-500 hover:text-green-500 text-lg font-bold py-1 px-4 rounded-[12px] border border-red-500 hover:border-green-500"
          >
            Add Animal
          </button>
          <button
            onClick={() => setIsOpenCategoryModel(true)}
            className="text-red-500 hover:text-green-500 text-lg font-bold py-1 px-4 rounded-[12px] border border-red-500 hover:border-green-500"
          >
            Add Category
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-20">
        {filterAnimalData?.map((info, index) => {
          return (
            <div key={index} className="flex flex-col items-center">
              <Image
                src={info.image}
                alt={info.name}
                width={100}
                height={100}
              />
              <h3 className="text-white text-lg font-normal">{info.name}</h3>
            </div>
          );
        })}
      </div>

      {/* add animal  */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-[20px]">Add Animal</h3>
            <button
              type="button"
              className="btn btn-xs btn-circle btn-outline"
              onClick={() => document.getElementById("my_modal_2").close()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmitAnimal)} method="dialog">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm font-bold">Name</span>
              </label>
              <input
                type="text"
                placeholder="Animal Name"
                className="input input-bordered"
                {...register("name", { required: "Animal Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm font-bold">Image</span>
              </label>
              <input
                type="file"
                placeholder="Image"
                className="input input-bordered pt-2"
                {...register("image", { required: "Animal image is required" })}
              />
              {errors.image && (
                <p className="text-red-500">{errors.image.message}</p>
              )}
            </div>
            <div className="mt-4">
              <button type="submit" className="btn btn-neutral w-full">
                Create Animal
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* add category  */}
      <dialog className="modal" open={isOpenCategoryModal}>
        <div className="modal-box">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-[20px]">Add Category</h3>
            <button
              type="button"
              className="btn btn-xs btn-circle btn-outline"
              onClick={() => setIsOpenCategoryModel(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* category form */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-sm font-bold">Category</span>
            </label>
            <input
              required
              type="text"
              placeholder="Category Name"
              className="input input-bordered"
              onChange={(e) => setCategoryText(e.target.value)}
            />
          </div>

          {/* SUBMIT ACTION */}
          <div className="mt-4">
            <button
              onClick={() => handleSaveAniaml()}
              type="submit"
              className="btn btn-neutral w-full"
            >
              Save
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default HomePage;
