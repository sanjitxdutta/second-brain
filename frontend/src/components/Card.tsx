import React, { useEffect, useState } from "react";
import { FaRegFileAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

export interface CardProps {
    title: string;
    subtitle?: string;
    link: string;
    tags?: string[];
    dateAdded: string;
    onDelete?: () => void;
}

interface LinkPreviewData {
    image?: string;
    title?: string;
    description?: string;
}

const Card: React.FC<CardProps> = ({
    title,
    subtitle,
    link,
    tags = [],
    dateAdded,
    onDelete,
}) => {
    const [preview, setPreview] = useState<LinkPreviewData | null>(null);

    useEffect(() => {
        const fetchPreview = async () => {
            try {
                const res = await fetch(
                    `https://api.microlink.io/?url=${encodeURIComponent(link)}`
                );
                const data = await res.json();
                if (data?.data) {
                    setPreview({
                        image: data.data.image?.url || "",
                        title: data.data.title || "",
                        description: data.data.description || "",
                    });
                }
            } catch {
                setPreview(null);
            }
        };
        fetchPreview();
    }, [link]);

    return (
        <div className={`bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-col`}>

            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-gray-600">
                    <FaRegFileAlt />
                    {subtitle && (
                        <span className="text-sm font-medium">{subtitle}</span>
                    )}
                </div>
                {onDelete && (
                    <button onClick={onDelete}>
                        <FaTrash className="hover:text-red-500" />
                    </button>
                )}
            </div>

            <h2 className="text-lg font-semibold mb-2">{title}</h2>

            <a href={link} target="_blank" rel="noopener noreferrer">
                <div className="w-full h-36 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center border mb-2">
                    {preview?.image ? (
                        <img
                            src={preview.image}
                            alt={preview.title || title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.src = "/placeholder.png";
                            }}
                        />
                    ) : (
                        <img
                            src="/placeholder.png"
                            alt="No Preview"
                            className="w-10 h-10 opacity-60"
                        />
                    )}
                </div>
            </a>

            {preview?.description && (
                <p className="text-xs text-gray-600 line-clamp-3">{preview.description}</p>
            )}

            {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="text-xs bg-purple-300 text-purple-500 px-2 py-1 rounded"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}

            <p className="text-xs text-gray-400 mt-3">
                Added on {new Date(dateAdded).toLocaleDateString()}
            </p>
        </div>
    );
};

export default Card;
