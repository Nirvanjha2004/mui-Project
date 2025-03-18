import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { FilePenLine, Check, Trash2, PlusCircle, Save } from 'lucide-react';

function CreateTest2() {
  // Test metadata
  const [testTitle, setTestTitle] = useState("");
  const [testDescription, setTestDescription] = useState("");
  const [timeLimit, setTimeLimit] = useState("");

  // Questions
  const [blanks, setBlanks] = useState<{ id: number; question: string; ans: string }[]>([]);
  const [mcq, setMcq] = useState<{ id: number; question: string; option: string[] }[]>([]);
  const [scq, setScq] = useState<{ id: number; question: string; option: string[] }[]>([]);
  
  // Edit states
  const [mcqEdit, setMcqEdit] = useState<{ [key: number]: boolean }>({});
  const [scqEdit, setScqEdit] = useState<{ [key: number]: boolean }>({});
  const [blankEdit, setBlankEdit] = useState<{ [key: number]: boolean }>({});
  
  // Submitted state
  const [submittedTest, setSubmittedTest] = useState<{
    title: string;
    description: string;
    timeLimit: string;
    mcq: { id: number; question: string; option: string[] }[];
    scq: { id: number; question: string; option: string[] }[];
    blanks: { id: number; question: string; ans: string }[];
  } | null>(null);

  function toggleEdit(setEditState: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>, id: number) {
    setEditState((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function updateMCQQues(id: number, value: string) {
    setMcq((prev) => prev.map((q) => (q.id === id ? { ...q, question: value } : q)));
  }

  function updateMCQOptions(id: number, index: number, value: string) {
    setMcq((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, option: q.option.map((opt, i) => (i === index ? value : opt)) } : q
      )
    );
  }

  function updateSCQQues(id: number, value: string) {
    setScq((prev) => prev.map((q) => (q.id === id ? { ...q, question: value } : q)));
  }

  function updateSCQOptions(id: number, index: number, value: string) {
    setScq((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, option: q.option.map((opt, i) => (i === index ? value : opt)) } : q
      )
    );
  }

  function updateFillBlanksQues(id: number, value: string) {
    setBlanks((prev) => prev.map((q) => (q.id === id ? { ...q, question: value } : q)));
  }

  function updateFillBlanksAns(id: number, value: string) {
    setBlanks((prev) => prev.map((q) => (q.id === id ? { ...q, ans: value } : q)));
  }

  // Delete functions
  function deleteMCQ(id: number) {
    setMcq((prev) => prev.filter((q) => q.id !== id));
  }

  function deleteSCQ(id: number) {
    setScq((prev) => prev.filter((q) => q.id !== id));
  }

  function deleteBlank(id: number) {
    setBlanks((prev) => prev.filter((q) => q.id !== id));
  }

  function handleSubmit() {
    setSubmittedTest({
      title: testTitle,
      description: testDescription,
      timeLimit: timeLimit,
      mcq: [...mcq],
      scq: [...scq],
      blanks: [...blanks]
    });
    console.log("Test submitted:", { testTitle, testDescription, timeLimit, mcq, scq, blanks });
  }

  return (
    <div className="flex flex-col max-w-4xl mx-auto w-full gap-6 p-4">
      {/* Header */}
      <div className="text-center mb-2">
        <h1 className="text-2xl font-bold">Create New Test</h1>
        <p className="text-gray-500">Design your test with different question formats</p>
      </div>

      {/* Test Details Section */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Test Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="test-title">Test Title</Label>
            <Input 
              id="test-title" 
              placeholder="Enter test title..."
              value={testTitle}
              onChange={(e) => setTestTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="test-description">Test Description</Label>
            <Textarea 
              id="test-description" 
              placeholder="Describe what this test is about..."
              value={testDescription}
              onChange={(e) => setTestDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time-limit">Time Limit (minutes)</Label>
            <Input 
              id="time-limit" 
              type="number" 
              placeholder="Enter time limit..."
              value={timeLimit}
              onChange={(e) => setTimeLimit(e.target.value)}
              className="max-w-[200px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Questions Tabs */}
      <Tabs defaultValue="mcq" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="mcq">Multiple Choice ({mcq.length})</TabsTrigger>
          <TabsTrigger value="scq">Single Choice ({scq.length})</TabsTrigger>
          <TabsTrigger value="blanks">Fill Blanks ({blanks.length})</TabsTrigger>
        </TabsList>

        {/* MCQ Tab */}
        <TabsContent value="mcq" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Multiple Choice Questions</h2>
            <Button 
              onClick={() => setMcq([...mcq, { id: Date.now(), question: "", option: ["", "", "", ""] }])}
              className="flex items-center gap-2"
            >
              <PlusCircle size={16} />
              Add MCQ
            </Button>
          </div>
          
          <div className="space-y-4">
            {mcq.map((q) => (
              <Card key={q.id} className={`border-l-4 ${mcqEdit[q.id] ? 'border-l-blue-500' : 'border-l-transparent'}`}>
                <CardHeader className="pb-2 flex flex-row justify-between items-center">
                  <h3 className="font-medium">Question #{mcq.findIndex(item => item.id === q.id) + 1}</h3>
                  <div className="flex gap-2">
                    {mcqEdit[q.id] ? (
                      <Button variant="ghost" size="sm" onClick={() => toggleEdit(setMcqEdit, q.id)}>
                        <Check size={18} />
                      </Button>
                    ) : (
                      <Button variant="ghost" size="sm" onClick={() => toggleEdit(setMcqEdit, q.id)}>
                        <FilePenLine size={18} />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => deleteMCQ(q.id)} className="text-red-500">
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="mb-2 block">Question</Label>
                    <Input
                      placeholder="Enter MCQ question..."
                      value={q.question}
                      onChange={(e) => updateMCQQues(q.id, e.target.value)}
                      disabled={!mcqEdit[q.id]}
                      className={mcqEdit[q.id] ? "border-blue-300" : ""}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="block">Options</Label>
                    {q.option.map((option, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="bg-gray-200 dark:bg-gray-700 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                          {String.fromCharCode(65 + index)}
                        </div>
                        <Input
                          placeholder={`Option ${index + 1}`}
                          value={option}
                          onChange={(e) => updateMCQOptions(q.id, index, e.target.value)}
                          disabled={!mcqEdit[q.id]}
                          className={mcqEdit[q.id] ? "border-blue-300" : ""}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {mcq.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No multiple choice questions added yet. Click the button above to add one.
              </div>
            )}
          </div>
        </TabsContent>

        {/* SCQ Tab */}
        <TabsContent value="scq" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Single Choice Questions</h2>
            <Button 
              onClick={() => setScq([...scq, { id: Date.now(), question: "", option: ["", "", "", ""] }])}
              className="flex items-center gap-2"
            >
              <PlusCircle size={16} />
              Add SCQ
            </Button>
          </div>
          
          <div className="space-y-4">
            {scq.map((q) => (
              <Card key={q.id} className={`border-l-4 ${scqEdit[q.id] ? 'border-l-green-500' : 'border-l-transparent'}`}>
                <CardHeader className="pb-2 flex flex-row justify-between items-center">
                  <h3 className="font-medium">Question #{scq.findIndex(item => item.id === q.id) + 1}</h3>
                  <div className="flex gap-2">
                    {scqEdit[q.id] ? (
                      <Button variant="ghost" size="sm" onClick={() => toggleEdit(setScqEdit, q.id)}>
                        <Check size={18} />
                      </Button>
                    ) : (
                      <Button variant="ghost" size="sm" onClick={() => toggleEdit(setScqEdit, q.id)}>
                        <FilePenLine size={18} />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => deleteSCQ(q.id)} className="text-red-500">
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="mb-2 block">Question</Label>
                    <Input
                      placeholder="Enter SCQ question..."
                      value={q.question}
                      onChange={(e) => updateSCQQues(q.id, e.target.value)}
                      disabled={!scqEdit[q.id]}
                      className={scqEdit[q.id] ? "border-green-300" : ""}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="block">Options</Label>
                    {q.option.map((option, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="bg-gray-200 dark:bg-gray-700 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                          {index + 1}
                        </div>
                        <Input
                          placeholder={`Option ${index + 1}`}
                          value={option}
                          onChange={(e) => updateSCQOptions(q.id, index, e.target.value)}
                          disabled={!scqEdit[q.id]}
                          className={scqEdit[q.id] ? "border-green-300" : ""}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {scq.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No single choice questions added yet. Click the button above to add one.
              </div>
            )}
          </div>
        </TabsContent>

        {/* Fill Blanks Tab */}
        <TabsContent value="blanks" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Fill in the Blank Questions</h2>
            <Button 
              onClick={() => setBlanks([...blanks, { id: Date.now(), question: "", ans: "" }])}
              className="flex items-center gap-2"
            >
              <PlusCircle size={16} />
              Add Fill in the Blank
            </Button>
          </div>
          
          <div className="space-y-4">
            {blanks.map((q) => (
              <Card key={q.id} className={`border-l-4 ${blankEdit[q.id] ? 'border-l-purple-500' : 'border-l-transparent'}`}>
                <CardHeader className="pb-2 flex flex-row justify-between items-center">
                  <h3 className="font-medium">Question #{blanks.findIndex(item => item.id === q.id) + 1}</h3>
                  <div className="flex gap-2">
                    {blankEdit[q.id] ? (
                      <Button variant="ghost" size="sm" onClick={() => toggleEdit(setBlankEdit, q.id)}>
                        <Check size={18} />
                      </Button>
                    ) : (
                      <Button variant="ghost" size="sm" onClick={() => toggleEdit(setBlankEdit, q.id)}>
                        <FilePenLine size={18} />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => deleteBlank(q.id)} className="text-red-500">
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="mb-2 block">Question</Label>
                    <Input
                      placeholder="Enter Fill in the Blank question... (use ___ for blanks)"
                      value={q.question}
                      onChange={(e) => updateFillBlanksQues(q.id, e.target.value)}
                      disabled={!blankEdit[q.id]}
                      className={blankEdit[q.id] ? "border-purple-300" : ""}
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block">Answer</Label>
                    <Input
                      placeholder="Enter correct answer..."
                      value={q.ans}
                      onChange={(e) => updateFillBlanksAns(q.id, e.target.value)}
                      disabled={!blankEdit[q.id]}
                      className={blankEdit[q.id] ? "border-purple-300" : ""}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {blanks.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No fill in the blank questions added yet. Click the button above to add one.
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Summary Section */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Test Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-600 dark:text-blue-300">Multiple Choice</p>
              <p className="text-2xl font-bold">{mcq.length}</p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-sm text-green-600 dark:text-green-300">Single Choice</p>
              <p className="text-2xl font-bold">{scq.length}</p>
            </div>
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <p className="text-sm text-purple-600 dark:text-purple-300">Fill in the Blanks</p>
              <p className="text-2xl font-bold">{blanks.length}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => {
            setBlanks([]);
            setMcq([]);
            setScq([]);
            setTestTitle("");
            setTestDescription("");
            setTimeLimit("");
          }}>
            Clear All
          </Button>
          <Button 
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
            disabled={mcq.length === 0 && scq.length === 0 && blanks.length === 0}
          >
            <Save size={18} />
            Save Test
          </Button>
        </CardFooter>
      </Card>
      
      {/* Success message */}
      {submittedTest && (
        <div className="mt-4 p-5 bg-green-50 border border-green-200 text-green-800 rounded-md shadow-sm">
          <h3 className="font-bold text-lg mb-2">Test Saved Successfully!</h3>
          <p><strong>Title:</strong> {submittedTest.title}</p>
          <p><strong>Questions:</strong> {submittedTest.mcq.length + submittedTest.scq.length + submittedTest.blanks.length} total questions</p>
          <p className="text-sm text-green-600 mt-2">Your test has been saved and is ready for distribution.</p>
        </div>
      )}
    </div>
  );
}

export default CreateTest2;
