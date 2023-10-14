import { useEffect, useState } from "react";
import { OperationsResponse } from "../../client/api";
import { find, remove } from "../../client/wrapper/Operations";

const History = () => {
  const [result, setResult] = useState<OperationsResponse | null>(null);
  const [search, setSearch] = useState<string | undefined>();
  const [page, setPage] = useState<number>(0);

  const fetchData = async () => {
    setResult(
      await find(
        page * 5,
        5,
        search && !isNaN(search as unknown as number) ? parseInt(search) : undefined,
        search,
        search
      )
    );
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, [search, page]);

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <h3>History</h3>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="mb-3">
            <input
              type="string"
              className="form-control"
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setPage(0);
                setSearch(e.target.value);
              }}
            />
          </div>
          {result ? (
            <>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Type</th>
                    <th scope="col">Cost</th>
                    <th scope="col">Response</th>
                    <th scope="col">Balance</th>
                    <th scope="col">Date</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {result.result.map((r) => {
                    return (
                      <tr key={r.id}>
                        <th scope="row">{r.id}</th>
                        <td>{r.type}</td>
                        <td>{r.cost}</td>
                        <td>{r.response}</td>
                        <td>{r.balance}</td>
                        <td>{r.created_at}</td>
                        <td>
                          <button
                            className="btn unicode-black"
                            onClick={async (e) => {
                              e.preventDefault();
                              await remove(r.id);
                              if (
                                result.result[result.result.length - 1].id ===
                                r.id
                              ) {
                                setPage(page - 1);
                              }
                              await fetchData();
                            }}
                          >
                            🗑
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <nav aria-label="...">
                <ul className="pagination">
                  {[...Array(Math.ceil(result.count / 5)).keys()].map((i) => {
                    return (
                      <li
                        key={i}
                        className={"page-item " + (page === i ? "active" : "")}
                      >
                        <button
                          className="page-link"
                          onClick={(e) => {
                            e.preventDefault();
                            setPage(i);
                          }}
                        >
                          {i + 1}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </>
          ) : (
            <div className="spinner-border" role="status" />
          )}
        </div>
      </div>
    </div>
  );
};

export default History;

//TODO fix size
