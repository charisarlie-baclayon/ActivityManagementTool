export const WorkCard = ({ workData }) => {
  const { id, work, file_attachment, date_added } = workData;

  // If file_attachment is available, extract the file name
  const fileName = file_attachment ? file_attachment.split('/').pop() : 'No file attached';

  // If file_attachment is available, create a download link; otherwise, disable the link
  const downloadLink = file_attachment ? (
    <a href={file_attachment} download={fileName}>
      Download File
    </a>
  ) : (
    <span>{fileName}</span>
  );

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{work}</h5>
        <p className="card-text">Date Added: {new Date(date_added).toLocaleString()}</p>
        <p className="card-text">File Attachment: {downloadLink}</p>
        {/* Add more fields as needed */}
      </div>
    </div>
  );
};