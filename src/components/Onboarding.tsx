import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, X } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: 'Project Details',
    description: 'Tell us about your project requirements'
  },
  {
    id: 2,
    title: 'Services Selection',
    description: 'Choose the services you need'
  },
  {
    id: 3,
    title: 'Budget & Timeline',
    description: 'Define your budget and timeline'
  }
];

const Onboarding: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    services: [] as string[],
    budget: '',
    timeline: ''
  });

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-primary rounded-2xl w-full max-w-2xl p-6"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Start Your Project</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex justify-between mb-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex items-center"
            >
              <div className={`
                flex items-center justify-center w-8 h-8 rounded-full
                ${currentStep >= step.id ? 'bg-accent' : 'bg-gray-700'}
                transition-colors
              `}>
                {currentStep > step.id ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>
              <div className="ml-3 hidden sm:block">
                <p className="text-sm font-medium">{step.title}</p>
                <p className="text-xs text-gray-400">{step.description}</p>
              </div>
              {step.id < steps.length && (
                <ChevronRight className="w-5 h-5 mx-4 text-gray-600" />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-6"
            >
              {currentStep === 1 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Project Name
                    </label>
                    <input
                      type="text"
                      value={formData.projectName}
                      onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3"
                      placeholder="Enter project name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Project Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3"
                      placeholder="Describe your project"
                      required
                    />
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    Select Services
                  </label>
                  {['Website Development', 'Mobile App Development', 'Brand Development', 'Marketing'].map((service) => (
                    <label
                      key={service}
                      className="flex items-center space-x-3 p-4 border border-white/10 rounded-lg cursor-pointer hover:border-accent/50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={formData.services.includes(service)}
                        onChange={(e) => {
                          const updatedServices = e.target.checked
                            ? [...formData.services, service]
                            : formData.services.filter(s => s !== service);
                          setFormData({ ...formData, services: updatedServices });
                        }}
                        className="form-checkbox h-5 w-5 text-accent rounded border-white/10"
                      />
                      <span>{service}</span>
                    </label>
                  ))}
                </div>
              )}

              {currentStep === 3 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Budget Range
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3"
                      required
                    >
                      <option value="">Select budget range</option>
                      <option value="5000-10000">$5,000 - $10,000</option>
                      <option value="10000-25000">$10,000 - $25,000</option>
                      <option value="25000-50000">$25,000 - $50,000</option>
                      <option value="50000+">$50,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3"
                      required
                    >
                      <option value="">Select timeline</option>
                      <option value="1-2">1-2 months</option>
                      <option value="3-4">3-4 months</option>
                      <option value="5-6">5-6 months</option>
                      <option value="6+">6+ months</option>
                    </select>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-end mt-8 space-x-4">
            {currentStep < steps.length ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-lg flex items-center gap-2"
              >
                Next Step <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="submit"
                className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-lg flex items-center gap-2"
              >
                Submit <Check className="w-5 h-5" />
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Onboarding;