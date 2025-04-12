
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Clock, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function UserEngagement() {
  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Latest Updates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-nebBlue" />
                <Badge>New</Badge>
              </div>
              <CardTitle className="text-xl mt-2">Physics Revision Notes Added</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Complete set of revision notes for Mechanics and Optics chapters now available for download!
              </p>
              <p className="text-xs text-muted-foreground mt-2">Added on: April 5, 2081</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-nebBlue" />
                <Badge variant="outline">Update</Badge>
              </div>
              <CardTitle className="text-xl mt-2">2080 Past Papers Uploaded</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Past year question papers for all subjects from 2080 examinations are now available.
              </p>
              <p className="text-xs text-muted-foreground mt-2">Added on: March 28, 2081</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-nebBlue" />
                <Badge variant="secondary">Tip</Badge>
              </div>
              <CardTitle className="text-xl mt-2">Top 5 Exam Preparation Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Expert tips on how to effectively prepare for your Grade 11 science exams from top educators.
              </p>
              <p className="text-xs text-muted-foreground mt-2">Added on: March 15, 2081</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
