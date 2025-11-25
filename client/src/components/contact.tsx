import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { Github, Linkedin, Mail, Send, CheckCircle2, Terminal, Wifi, AlertCircle } from "lucide-react";
import { useState, useEffect, forwardRef } from "react";

interface TerminalInputProps {
  label: string;
  type?: string;
  placeholder: string;
  error?: string;
  [key: string]: any;
}

const TerminalInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, TerminalInputProps>(
  ({ label, type = "text", placeholder, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="font-mono text-xs text-[#00ffff] tracking-widest flex items-center gap-2">
          <span className="text-[#ff00ff]">&gt;</span> {label}
        </label>
        {type === "textarea" ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className="cyber-input w-full h-32 resize-none"
            placeholder={placeholder}
            {...props}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            type={type}
            className="cyber-input w-full"
            placeholder={placeholder}
            {...props}
          />
        )}
        {error && (
          <p className="font-mono text-xs text-[#ff0033] flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {error}
          </p>
        )}
      </div>
    );
  }
);

function ConnectionStatus() {
  const [ping, setPing] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPing(Math.floor(Math.random() * 50) + 10);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="cyber-card p-4 font-mono text-xs">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[#00ffff] tracking-widest">CONNECTION_STATUS</span>
        <Wifi className="w-4 h-4 text-[#00ff66]" />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-500">PING</span>
          <span className="text-[#00ff66]">{ping}ms</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">PROTOCOL</span>
          <span className="text-[#00ffff]">SECURE</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">ENCRYPTION</span>
          <span className="text-[#ff00ff]">AES-256</span>
        </div>
      </div>
    </div>
  );
}

export function Contact() {
  const { toast } = useToast();
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "TRANSMISSION_COMPLETE",
        description: "Message delivered successfully. Awaiting response...",
      });
      reset();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    },
    onError: (error: any) => {
      toast({
        title: "TRANSMISSION_FAILED",
        description: error.message || "Connection interrupted. Retry transmission.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactMessage) => {
    submitMutation.mutate(data);
  };

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, label: "GITHUB", url: "#", code: "GH-001" },
    { icon: <Linkedin className="h-5 w-5" />, label: "LINKEDIN", url: "#", code: "LI-002" },
    { icon: <Mail className="h-5 w-5" />, label: "DIRECT_MAIL", url: "mailto:hello@redweyne.com", code: "ML-003" }
  ];

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#0a0a0f] relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid-bg" />
      
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00ffff]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block">
            <div className="cyber-card px-6 py-2">
              <span className="font-mono text-sm text-[#00ffff] tracking-widest">
                [ SECTION_05 ]
              </span>
            </div>
          </div>
          
          <h2 className="cyber-text text-4xl sm:text-5xl md:text-6xl font-bold text-white">
            <span className="text-glow-cyan">ESTABLISH</span>{" "}
            <span className="text-[#ff00ff] text-glow-magenta">UPLINK</span>
          </h2>
          
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            <span className="text-[#00ffff]">&lt;</span>
            Initiate secure communication channel for project collaboration
            <span className="text-[#00ffff]">/&gt;</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <div className="cyber-card overflow-hidden">
              <div className="bg-[#0a0a0f] border-b border-[#00ffff]/20 px-6 py-4 flex items-center gap-3">
                <Terminal className="w-5 h-5 text-[#00ffff]" />
                <span className="font-mono text-sm text-[#00ffff] tracking-widest">MESSAGE_TERMINAL</span>
              </div>
              
              <div className="p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <TerminalInput
                    label="IDENTIFIER"
                    placeholder="Enter your designation..."
                    error={errors.name?.message}
                    {...register("name")}
                  />

                  <TerminalInput
                    label="COMM_ADDRESS"
                    type="email"
                    placeholder="Enter communication address..."
                    error={errors.email?.message}
                    {...register("email")}
                  />

                  <TerminalInput
                    label="TRANSMISSION_DATA"
                    type="textarea"
                    placeholder="Enter your message payload..."
                    error={errors.message?.message}
                    {...register("message")}
                  />

                  <button
                    type="submit"
                    disabled={submitMutation.isPending}
                    className="cyber-button w-full sm:w-auto group"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {submitMutation.isPending ? (
                        <>
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          TRANSMITTING...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          SEND_TRANSMISSION
                        </>
                      )}
                    </span>
                  </button>

                  {showSuccess && (
                    <div className="cyber-card p-4 border-[#00ff66] bg-[#00ff66]/5">
                      <div className="flex items-center gap-3 font-mono text-sm text-[#00ff66]">
                        <CheckCircle2 className="h-5 w-5" />
                        <div>
                          <div>TRANSMISSION_SUCCESSFUL</div>
                          <div className="text-xs text-[#00ff66]/70">Response ETA: 24 hours</div>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="cyber-card p-6">
              <h3 className="font-mono text-sm text-[#00ffff] tracking-widest mb-6 flex items-center gap-2">
                <span className="text-[#ff00ff]">//</span> NETWORK_NODES
              </h3>
              <div className="space-y-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 border border-[#00ffff]/20 hover:border-[#00ffff] hover:bg-[#00ffff]/5 transition-all group"
                  >
                    <div className="text-[#00ffff] group-hover:text-[#ff00ff] transition-colors">
                      {link.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-mono text-sm text-white">{link.label}</div>
                      <div className="font-mono text-xs text-gray-500">{link.code}</div>
                    </div>
                    <div className="font-mono text-xs text-[#00ff66]">ACTIVE</div>
                  </a>
                ))}
              </div>
            </div>

            <ConnectionStatus />

            <div className="cyber-card p-6 border-[#00ff66]/30">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 rounded-full bg-[#00ff66] animate-pulse mt-1" />
                <div>
                  <p className="font-mono text-sm text-white mb-1">
                    STATUS: AVAILABLE
                  </p>
                  <p className="font-mono text-xs text-gray-500">
                    Response time: &lt; 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
