/** @format */

"use client";

import { useState } from "react";
import { 
  Upload, 
  Home, 
  MapPin, 
  DollarSign, 
  FileText, 
  CheckCircle,
  Building2
} from "lucide-react";

export default function MintPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    valuation: "",
    description: "",
    propertyType: "residential",
    totalTokens: "100000",
    pricePerToken: ""
  });

  const handleFileSelect = (files: File[]) => {
    setSelectedFiles(prev => [...prev, ...files.slice(0, 5 - prev.length)]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      // Calculate price per token
      if (name === 'valuation' || name === 'totalTokens') {
        const valuation = name === 'valuation' ? parseFloat(value) : parseFloat(prev.valuation);
        const totalTokens = name === 'totalTokens' ? parseFloat(value) : parseFloat(prev.totalTokens);
        const pricePerToken = valuation > 0 && totalTokens > 0 ? (valuation / totalTokens).toFixed(4) : "";
        newData.pricePerToken = pricePerToken;
      }
      
      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.location || !formData.valuation) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setIsProcessing(true);
      
      // Prepare property data for display
      const propertyData = {
        title: formData.title,
        location: formData.location,
        valuation: `$${parseFloat(formData.valuation).toLocaleString()}`,
        propertyType: formData.propertyType,
        totalTokens: parseInt(formData.totalTokens).toLocaleString(),
        pricePerToken: `$${formData.pricePerToken}`,
        filesCount: selectedFiles.length
      };
      
      console.log("Property Tokenization Data:", propertyData);
      
      // Show success message
      const successMessage = `✅ Property Tokenization Ready

Property: ${propertyData.title}
Location: ${propertyData.location}
Valuation: ${propertyData.valuation}
Tokens: ${propertyData.totalTokens} SDPT
Price per Token: ${propertyData.pricePerToken}

Files: ${propertyData.filesCount} documents

This demonstration shows property tokenization data.
In production, this would be recorded on blockchain.`;

      alert(successMessage);
      
      // Reset form after success
      setFormData({
        title: "",
        location: "",
        valuation: "",
        description: "",
        propertyType: "residential",
        totalTokens: "100000",
        pricePerToken: ""
      });
      setSelectedFiles([]);
      
    } catch (error: any) {
      console.error("Error:", error);
      alert(`Error: ${error.message || "Failed to process property data"}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Simple Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full mb-4">
            <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              MINT PROPERTY TOKEN
            </span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Tokenize Real Estate
          </h1>
          
          <p className="text-gray-600 dark:text-gray-300">
            Convert property assets into digital tokens
          </p>
        </div>

        {/* Main Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Form Header */}
          <div className="border-b border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Home className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Property Details
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Fill in property information for tokenization
                </p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              {/* Property Basics */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Property Title *
                  </label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Luxury Apartment Complex"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Location *
                  </label>
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="City, State"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Valuation (USD) *
                  </label>
                  <input
                    name="valuation"
                    value={formData.valuation}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="5000000"
                    type="number"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Total Tokens
                  </label>
                  <input
                    name="totalTokens"
                    value={formData.totalTokens}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="100000"
                    type="number"
                  />
                </div>
              </div>

              {/* Token Preview */}
              {formData.pricePerToken && (
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Token Economics
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Price per Token</div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        ${formData.pricePerToken}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Total Tokens</div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {parseInt(formData.totalTokens).toLocaleString()} SDPT
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Property Type & Description */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Property Type
                  </label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="industrial">Industrial</option>
                    <option value="mixed-use">Mixed-Use</option>
                  </select>
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[100px] resize-y"
                    placeholder="Describe the property features..."
                    rows={3}
                  />
                </div>
              </div>

              {/* File Upload */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Property Documents
                </label>
                
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
                  <div className="mx-auto w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3">
                    <Upload className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Click to browse files
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*,.pdf,.doc,.docx"
                    className="hidden"
                    id="file-upload"
                    onChange={(e) => e.target.files && handleFileSelect(Array.from(e.target.files))}
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg cursor-pointer transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    Select Files
                  </label>
                </div>

                {/* Selected Files */}
                {selectedFiles.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Selected Files ({selectedFiles.length})
                    </h4>
                    <div className="space-y-2">
                      {selectedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg p-3"
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-[200px]">
                              {file.name}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(index)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold rounded-lg shadow hover:shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[48px]"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Prepare Token Minting
                    </>
                  )}
                </button>
                
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
                  This is a demonstration interface for property tokenization.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}