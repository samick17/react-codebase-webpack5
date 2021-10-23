MAKEFLAGS += --silent

launch:
	npm start

init-submodules:
	git submodule update --init --recursive

update-submodules:
	git submodule foreach --recursive git pull origin master

help:
	echo "[XIDE]"
	echo "Author: Samick.Hsu"
	echo "To Add Submodule:\n - git submodule add --name <module_name> <repo_url> submodules/<module_name>"
	echo "To Update Submodule:\n - make update"
