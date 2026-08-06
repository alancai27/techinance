/**
 * Export a Google Classroom class's teacher materials to a Google Doc.
 *
 * WHY THIS AND NOT THE CLASS DRIVE FOLDER
 * The class Drive folder is mostly student submissions. Classroom files every
 * turned-in assignment there next to the teacher materials, so downloading it
 * gives you a pile of other people's work with the course content buried in it.
 * The Classwork API keeps the two apart: announcements, assignments and
 * materials are what a teacher posted, and submissions are a separate resource
 * this script never touches.
 *
 * WHY APPS SCRIPT AND NOT A LOCAL NODE SCRIPT
 * Classroom's API scopes are "sensitive", so wiring them into a Google Cloud
 * OAuth client drags that whole project into Google's verification review. You
 * do not want that on the project your students authenticate through. Apps
 * Script runs as you, authorizes with one click, and needs no Cloud project at
 * all.
 *
 * SETUP (about two minutes)
 *   1. Go to https://script.google.com and create a new project.
 *   2. Paste this whole file in, replacing the default Code.gs contents.
 *   3. In the left sidebar click "Services" (+), add "Google Classroom API",
 *      leave the identifier as "Classroom", click Add.
 *   4. Pick `listMyCourses` from the function dropdown and press Run. Approve
 *      the permissions prompt. The execution log prints your courses with ids.
 *   5. Paste the id you want into COURSE_ID below.
 *   6. Pick `exportCourse` and press Run. It creates a Doc in your Drive and
 *      logs the URL.
 *
 * Then download that Doc as Markdown (File > Download > Markdown) and drop it
 * into content/sources/.
 */

/** The class to export. Run listMyCourses() first to find this. */
const COURSE_ID = "";

/**
 * Prints every course you teach or are enrolled in, with its id.
 */
function listMyCourses() {
  const response = Classroom.Courses.list({ pageSize: 100 });
  const courses = response.courses || [];
  if (courses.length === 0) {
    Logger.log("No courses found on this account.");
    return;
  }
  courses.forEach(function (course) {
    Logger.log(
      "%s  |  %s  |  %s",
      course.id,
      course.name,
      course.courseState
    );
  });
  Logger.log("\nPaste the id you want into COURSE_ID, then run exportCourse().");
}

/**
 * Writes one course's announcements, assignments and materials to a Doc.
 */
function exportCourse() {
  if (!COURSE_ID) {
    Logger.log("Set COURSE_ID first. Run listMyCourses() to find it.");
    return;
  }

  const course = Classroom.Courses.get(COURSE_ID);
  const doc = DocumentApp.create("Classroom export - " + course.name);
  const body = doc.getBody();

  body.appendParagraph(course.name).setHeading(DocumentApp.ParagraphHeading.TITLE);
  if (course.description) {
    body.appendParagraph(course.description);
  }

  // Materials: the "just here's a resource" posts. Usually where course
  // content lives, so they go first.
  section(body, "Materials");
  eachPage(
    function (token) {
      return Classroom.Courses.CourseWorkMaterials.list(COURSE_ID, {
        pageSize: 100,
        pageToken: token,
      });
    },
    "courseWorkMaterial",
    function (item) {
      writeItem(body, item.title, item.description, item.materials, item.alternateLink);
    }
  );

  // Assignments and questions.
  section(body, "Assignments");
  eachPage(
    function (token) {
      return Classroom.Courses.CourseWork.list(COURSE_ID, {
        pageSize: 100,
        pageToken: token,
      });
    },
    "courseWork",
    function (item) {
      writeItem(body, item.title, item.description, item.materials, item.alternateLink);
    }
  );

  // Announcements have no title, so the first line of text stands in.
  section(body, "Announcements");
  eachPage(
    function (token) {
      return Classroom.Courses.Announcements.list(COURSE_ID, {
        pageSize: 100,
        pageToken: token,
      });
    },
    "announcements",
    function (item) {
      const text = item.text || "";
      const title = text.split("\n")[0].slice(0, 80) || "(untitled)";
      writeItem(body, title, text, item.materials, item.alternateLink);
    }
  );

  doc.saveAndClose();
  Logger.log("Done: %s", doc.getUrl());
}

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

/**
 * Walks every page of a list endpoint. Classroom paginates at 100 by default,
 * and a class with a year of posts will exceed that.
 */
function eachPage(fetch, key, handle) {
  let token = null;
  let count = 0;
  do {
    const response = fetch(token);
    const items = response[key] || [];
    items.forEach(function (item) {
      handle(item);
      count += 1;
    });
    token = response.nextPageToken;
  } while (token);
  Logger.log("%s: %s items", key, count);
}

function section(body, name) {
  body.appendParagraph(name).setHeading(DocumentApp.ParagraphHeading.HEADING1);
}

/**
 * One post: its title, its text, and links to whatever was attached. Drive
 * attachments are listed by title and URL rather than downloaded, so you can
 * open only the ones you actually want.
 */
function writeItem(body, title, description, materials, link) {
  body.appendParagraph(title || "(untitled)").setHeading(
    DocumentApp.ParagraphHeading.HEADING2
  );
  if (description) {
    body.appendParagraph(description);
  }
  (materials || []).forEach(function (material) {
    if (material.driveFile && material.driveFile.driveFile) {
      const file = material.driveFile.driveFile;
      body.appendListItem("Drive: " + file.title + "  " + (file.alternateLink || ""));
    } else if (material.link) {
      body.appendListItem("Link: " + (material.link.title || "") + "  " + material.link.url);
    } else if (material.youtubeVideo) {
      body.appendListItem(
        "YouTube: " + (material.youtubeVideo.title || "") + "  " + material.youtubeVideo.alternateLink
      );
    } else if (material.form) {
      body.appendListItem("Form: " + (material.form.title || "") + "  " + material.form.formUrl);
    }
  });
  if (link) {
    body.appendParagraph("Post: " + link).setFontSize(8);
  }
}
