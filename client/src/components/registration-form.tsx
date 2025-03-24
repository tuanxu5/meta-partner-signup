import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2 } from "lucide-react";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { insertPartnerSchema, type InsertPartner } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const formSchema = insertPartnerSchema;

export function RegistrationForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "N/A", // Default value for hidden field
      businessType: "other", // Default value for hidden field
      fullName: "",
      jobTitle: "N/A", // Default value for hidden field
      email: "",
      whatsappNumber: "",
      country: "",
      website: "N/A", // Default value for hidden field
      metaExperience: "",
      platforms: [],
      interest: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: InsertPartner) => {
      const res = await apiRequest("POST", "/api/partners", data);
      return res.json();
    },
    onSuccess: () => {
      setIsSuccess(true);
    },
    onError: (error) => {
      toast({
        title: "Error submitting form",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    // Include all fields and let the server handle filtering
    submitMutation.mutate(data);
  }

  function resetForm() {
    form.reset();
    setIsSuccess(false);
  }

  return (
    <Card className="bg-white rounded-lg shadow-md">
      <CardContent className="p-6 sm:p-8">
        {!isSuccess ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">


              {/* Contact Information Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Thông tin liên hệ</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Full Name */}
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Họ và tên *</FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập họ và tên của bạn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />



                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Nhập địa chỉ email của bạn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* WhatsApp Number */}
                  <FormField
                    control={form.control}
                    name="whatsappNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số WhatsApp * (kèm mã quốc gia)</FormLabel>
                        <FormControl>
                          <Input placeholder="+84123456789" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Country */}
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quốc gia *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn quốc gia" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="vn">Việt Nam</SelectItem>
                            <SelectItem value="us">Hoa Kỳ</SelectItem>
                            <SelectItem value="uk">Vương Quốc Anh</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="au">Úc</SelectItem>
                            <SelectItem value="sg">Singapore</SelectItem>
                            <SelectItem value="cn">Trung Quốc</SelectItem>
                            <SelectItem value="jp">Nhật Bản</SelectItem>
                            <SelectItem value="kr">Hàn Quốc</SelectItem>
                            <SelectItem value="th">Thái Lan</SelectItem>
                            <SelectItem value="my">Malaysia</SelectItem>
                            <SelectItem value="id">Indonesia</SelectItem>
                            <SelectItem value="ph">Philippines</SelectItem>
                            <SelectItem value="lao">Lào</SelectItem>
                            <SelectItem value="kh">Campuchia</SelectItem>
                            <SelectItem value="mm">Myanmar</SelectItem>
                            <SelectItem value="in">Ấn Độ</SelectItem>
                            <SelectItem value="de">Đức</SelectItem>
                            <SelectItem value="fr">Pháp</SelectItem>
                            <SelectItem value="it">Ý</SelectItem>
                            <SelectItem value="es">Tây Ban Nha</SelectItem>
                            <SelectItem value="nl">Hà Lan</SelectItem>
                            <SelectItem value="ru">Nga</SelectItem>
                            <SelectItem value="br">Brazil</SelectItem>
                            <SelectItem value="mx">Mexico</SelectItem>
                            <SelectItem value="za">Nam Phi</SelectItem>
                            <SelectItem value="ae">UAE</SelectItem>
                            <SelectItem value="other">Quốc gia khác</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />


                </div>
              </div>

              {/* Meta Experience Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Kinh nghiệm với nền tảng Meta</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Meta Experience */}
                  <FormField
                    control={form.control}
                    name="metaExperience"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Kinh nghiệm của bạn với nền tảng Meta *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn mức độ kinh nghiệm của bạn" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="beginner">Mới bắt đầu - Chưa có kinh nghiệm</SelectItem>
                            <SelectItem value="intermediate">Trung bình - Đã có một số kinh nghiệm</SelectItem>
                            <SelectItem value="advanced">Nâng cao - Người dùng thường xuyên</SelectItem>
                            <SelectItem value="expert">Chuyên gia - Có kinh nghiệm chuyên nghiệp</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Platforms Used */}
                  <FormField
                    control={form.control}
                    name="platforms"
                    render={() => (
                      <FormItem className="sm:col-span-2">
                        <div className="mb-2">
                          <FormLabel>Bạn sử dụng những nền tảng Meta nào? (Chọn tất cả những gì phù hợp) *</FormLabel>
                        </div>
                        <div className="space-y-2">
                          {[
                            { id: "facebook", label: "Facebook" },
                            { id: "instagram", label: "Instagram" },
                            { id: "whatsapp", label: "WhatsApp" },
                            { id: "messenger", label: "Messenger" },
                          ].map((platform) => (
                            <FormField
                              key={platform.id}
                              control={form.control}
                              name="platforms"
                              render={({ field }) => {
                                return (
                                  <div className="flex items-center">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(platform.id)}
                                        onCheckedChange={(checked) => {
                                          const updatedPlatforms = checked
                                            ? [...(field.value || []), platform.id]
                                            : (field.value || []).filter((value) => value !== platform.id);
                                          field.onChange(updatedPlatforms);
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="ml-2 font-normal">{platform.label}</FormLabel>
                                  </div>
                                );
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Primary Interest */}
                  <FormField
                    control={form.control}
                    name="interest"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Bạn quan tâm nhất điều gì khi trở thành Đối tác kinh doanh của Meta? *</FormLabel>
                        <FormControl>
                          <Textarea rows={3} placeholder="Mô tả sở thích của bạn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Agreement */}
              <div className="mb-6">
                <FormField
                  control={form.control}
                  name="agreement"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Tôi đồng ý với <a href="#" className="text-[#1877F2] hover:underline">Điều khoản dịch vụ</a> và <a href="#" className="text-[#1877F2] hover:underline">Chính sách bảo mật</a> của Meta *
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <Button 
                  type="submit" 
                  className="w-full sm:w-auto px-6 py-3 bg-[#1877F2] hover:bg-[#166fe5]"
                  disabled={submitMutation.isPending}
                >
                  {submitMutation.isPending ? "Đang gửi..." : "Gửi đơn đăng ký"}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className="fade-in text-center py-12">
            <div className="mb-4 inline-block p-2 rounded-full bg-green-100">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Đơn đăng ký đã được chấp nhận!</h3>
            <p className="text-gray-600 mb-6">Cảm ơn bạn đã quan tâm đến chương trình Meta Business Partner. Đơn đăng ký của bạn đã được tiếp nhận và bộ phận hỗ trợ sẽ liên hệ với bạn trong vòng 3-5 ngày làm việc.</p>
            <Button 
              variant="outline" 
              className="px-6 py-2 text-[#1877F2] border-[#1877F2] hover:bg-[#e7f3ff]"
              onClick={resetForm}
            >
              Đăng ký doanh nghiệp khác
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
