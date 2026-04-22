"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { axiosPrivateClient } from "@/lib/axios.private.client";
import { useUser } from "@/hooks/get-user.hook";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const ProfileUpdate = () => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [genderInput, setGenderInput] = useState("");

    const router = useRouter();
    const axiosInstance = axiosPrivateClient();
    const { userData, userRefetch } = useUser();
    const { user } = userData || {};
    const { address, gender, latitude, longitude } = user || {};

    // ✅ Prefill existing gender and address
    useEffect(() => {
        if (gender) setGenderInput(gender);
        if (address) setQuery(address);
    }, [gender, address]);

    // ✅ Mutation: Update profile
    const profileUpdate = useMutation({
        mutationKey: ["update-profile"],
        mutationFn: async () => {
            let lat, lng, placeName;

            // If user selected a new location
            if (selectedLocation) {
                [lng, lat] = selectedLocation.center;
                placeName = selectedLocation.place_name;
            }
            // If not, fallback to existing location
            else if (address && latitude && longitude) {
                lat = latitude;
                lng = longitude;
                placeName = address;
            }
            // If no location at all
            else {
                throw new Error("Please select a location before saving.");
            }

            const response = await axiosInstance.post("/update-profile", {
                latitude: String(lat),
                longitude: String(lng),
                address: placeName,
                gender: genderInput,
            });
            return response.data;
        },
        onSuccess: (response) => {
            toast.success(response?.message || "Profile updated successfully");
            userRefetch();
            router.push("/dashboard");
        },
        onError: (err) => {
            console.error(err);
            toast.error(err?.response?.data?.message || err.message || "Something went wrong");
        },
    });

    // ✅ Fetch suggestions from Mapbox
    const handleSearch = async (value) => {
        setQuery(value);
        if (value.length < 2) return;
        try {
            const res = await axios.get(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(value)}.json`,
                {
                    params: {
                        access_token: MAPBOX_TOKEN,
                        autocomplete: true,
                        limit: 5,
                    },
                }
            );
            setSuggestions(res.data.features);
        } catch (err) {
            console.error("Mapbox error:", err);
        }
    };

    // ✅ When user selects a suggestion
    const handleSelect = (place) => {
        setSelectedLocation(place);
        setQuery(place.place_name);
        setSuggestions([]);
    };

    // ✅ Handle Save Button
    const handleSave = () => {
        if (!selectedLocation && !address) {
            toast.error("Please select a location before saving.");
            return;
        }
        if (!genderInput) {
            toast.error("Please select your gender.");
            return;
        }
        profileUpdate.mutate();
    };

    return (
        <div className="w-full flex flex-col gap-4">
            {/* 📍 Location Input */}
            <div className="flex flex-col gap-2">
                <label className="font-medium">Location</label>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Start typing a city, address, or place..."
                    className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
                {suggestions.length > 0 && (
                    <ul className="border rounded-sm mt-2 bg-white shadow-md max-h-56 overflow-y-auto z-50">
                        {suggestions.map((place) => (
                            <li
                                key={place.id}
                                onClick={() => handleSelect(place)}
                                className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                            >
                                {place.place_name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* 👤 Gender Input */}
            <div className="flex flex-col gap-2">
                <label className="font-medium">Gender</label>
                <select
                    value={genderInput}
                    onChange={(e) => setGenderInput(e.target.value)}
                    className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                >
                    <option value="">Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>

            {/* ✅ Save Button */}
            <button
                onClick={handleSave}
                disabled={profileUpdate.isPending}
                className="px-4 py-3 bg-black disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium hover:bg-gray-800 transition"
            >
                {profileUpdate.isPending ? "Saving..." : "Save Changes"}
            </button>
        </div>
    );
};

export default ProfileUpdate;
