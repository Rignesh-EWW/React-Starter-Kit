import { useState } from 'react'
import { FileText, Save, Loader2, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RichTextEditor } from '@/components/RichTextEditor'
import { useData } from '@/contexts/DataContext'
import { useToast } from '@/hooks/use-toast'

export function TermsConditionsPage() {
  const { policies, updatePolicies } = useData()
  const { toast } = useToast()
  const [content, setContent] = useState(policies.termsAndConditions)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('edit')

  const handleSave = async () => {
    setIsSaving(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    updatePolicies({ termsAndConditions: content })
    
    toast({
      title: 'Terms & Conditions saved',
      description: 'Your changes have been saved successfully.',
      variant: 'success'
    })
    
    setIsSaving(false)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-gradient">Terms & Conditions</h1>
          <p className="text-muted-foreground mt-1">
            Manage your application's terms and conditions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-sm text-muted-foreground">
            Last updated: {policies.lastUpdated}
          </p>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <div>
              <CardTitle className="font-display">Terms & Conditions Editor</CardTitle>
              <CardDescription>
                Use the rich text editor to format your terms and conditions
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="preview">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="edit">
              <RichTextEditor
                content={content}
                onChange={setContent}
                placeholder="Write your terms and conditions here..."
              />
            </TabsContent>
            
            <TabsContent value="preview">
              <div 
                className="prose prose-invert max-w-none p-6 rounded-lg border border-border bg-muted/20"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
