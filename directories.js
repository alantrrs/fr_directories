// Prior notes/thoughts:
// I think preferred data structure implementation for this might be some kind of tree if given more time (root = root, children = directories)
// considering these data structure as well: objects (key would be name of directory, and it's value is an array containing its subdirectories)

class Directory {
  constructor() {
    this.filePath = {};
  }

  // Directory class's run method to CREATE/READ/MOVE/DELETE directories
  run(command) {
    const checkInput = command.split(" ");
    const checkInputSplitBySlashCreate = checkInput[1];

    // CREATE DIRECTORIES
    if (checkInput[0] === "CREATE") {
      if (checkInputSplitBySlashCreate) {
        let fileNameSplit = null;
        fileNameSplit = checkInputSplitBySlashCreate.split("/");
        const directoryName = fileNameSplit[0];

        // if we are only creating the main directory and it is not in filePath as a key, create it and set value to empty array
        if (fileNameSplit.length === 1) {
          this.filePath[directoryName] = [];
        }

        // if we are creating 2 directories and root dir is in file path as a key, push to the array
        if (fileNameSplit.length === 2 && directoryName in this.filePath) {
          this.filePath[directoryName].push(fileNameSplit[1]);
        }

        // if we are creating 3 directories and root dir is in file path as a key, push to the array
        if (fileNameSplit.length === 3 && directoryName in this.filePath) {
          this.filePath[directoryName].push(fileNameSplit[2]);
        }
      }
    }
    // LIST DIRECTORIES
    if (checkInput[0] === "LIST") {
      console.log(this.filePath);
    }

    // MOVE DIRECTORIES
    if (checkInput[0] === "MOVE") {
      const checkInputSplitSlashMove = checkInput[1].split("/");
      const directoryDestination = checkInput[2];
      const previousDirectory = checkInput[1];

      // if we are moving a subdirectory
      if (checkInputSplitSlashMove.length > 1) {
        const moved_directory =
          this.filePath[checkInputSplitSlashMove[0]].pop();
        this.filePath[directoryDestination].push(moved_directory);
      }

      // else, we are moving an entire directory and it's directories
      else {
        this.filePath[directoryDestination].push([previousDirectory]);
        const sub_directories = this.filePath[previousDirectory];

        while (sub_directories.length > 0) {
          const sub_dir = sub_directories.pop();
          this.filePath[directoryDestination].push(sub_dir);
        }
        delete this.filePath[previousDirectory];
      }
    }

    // DELETE DIRECTORIES
    if (checkInput[0] === "DELETE") {
      // pass
    }
  }
}

const dirs = new Directory();

dirs.run("CREATE fruits");
dirs.run("CREATE vegetables");
dirs.run("CREATE grains");
dirs.run("CREATE fruits/apples");
dirs.run("CREATE fruits/apples/fuji");
dirs.run("LIST");
dirs.run("CREATE grains/squash");
dirs.run("MOVE grains/squash vegetables");
dirs.run("CREATE foods");
dirs.run("MOVE grains foods");
dirs.run("MOVE fruits foods");
dirs.run("MOVE vegetables foods");
dirs.run("LIST");

// dirs.run("DELETE fruits/apples");
// dirs.run("DELETE foods/fruits/apples");
// dirs.run("LIST");

// TODO: Implement the delete command
